"use server";

import {
  isAdmin,
  isAuthenticated,
  notAuthenticatedObject,
} from "@/lib/auth/auth-functions";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";

type ActionResult<T = any> = {
  success: boolean;
  message?: string | null;
  data?: T | null;
};

export async function getOrganizations() {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  try {
    const res = await auth.api.listOrganizations({
      headers: await headers(),
    });
    return {
      success: true,
      data: res ?? [],
      message: null,
    } as ActionResult;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message ?? "Unable to list organizations",
      data: null,
    } as ActionResult;
  }
}

export async function createOrganization(
  name: string,
  slug: string,
  logo: string
) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;
  const admin = await isAdmin();
  if (!admin) {
    return {
      success: false,
      message: "Not authorized",
      data: null,
    } as ActionResult;
  }

  try {
    const data = await auth.api.createOrganization({
      body: { name, slug, logo },
      headers: await headers(),
    });

    return {
      success: true,
      message: null,
      data,
    } as ActionResult;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message ?? "Unexpected error",
      data: null,
    } as ActionResult;
  }
}

export async function getMembers(organizationId: string) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  try {
    const data = await auth.api.listMembers({
      query: {
        organizationId: organizationId,
        sortBy: "createdAt",
        sortDirection: "asc",
      },
      headers: await headers(),
    });
    return { success: true, data, message: null } as ActionResult;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message ?? "Unexpected error",
      data: null,
    } as ActionResult;
  }
}

export async function addMember(organizationId: string, userId: string) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;
  const admin = await isAdmin();
  if (!admin) {
    return {
      success: false,
      message: "Not authorized",
      data: null,
    } as ActionResult;
  }

  try {
    const data = await auth.api.addMember({
      body: {
        userId: userId,
        role: "member",
        organizationId: organizationId,
      },
      headers: await headers(),
    });

    return { success: true, data, message: null } as ActionResult;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message ?? "Unexpected error",
      data: null,
    } as ActionResult;
  }
}

export async function removeMember(organizationId: string, userId: string) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;
  const admin = await isAdmin();
  if (!admin) {
    return {
      success: false,
      message: "Not authorized",
      data: null,
    } as ActionResult;
  }

  try {
    const data = await auth.api.removeMember({
      body: {
        memberIdOrEmail: userId,
        organizationId: organizationId,
      },
      headers: await headers(),
    });
    return { success: true, data, message: null } as ActionResult;
  } catch (error: any) {
    return {
      success: false,
      message: error.message ?? "Unable to remove member",
      data: null,
    } as ActionResult;
  }
}

export async function deleteOrganization(organizationId: string) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;
  const admin = await isAdmin();
  if (!admin) {
    return {
      success: false,
      message: "Not authorized",
      data: null,
    } as ActionResult;
  }

  try {
    await auth.api.deleteOrganization({
      body: { organizationId },
      headers: await headers(),
    });

    return {
      success: true,
      message: null,
      data: null,
    } as ActionResult;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message ?? "Unexpected error",
      data: null,
    } as ActionResult;
  }
}

export async function listUsers() {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;
  const admin = await isAdmin();
  if (!admin) {
    return {
      success: false,
      message: "Not authorized",
      data: null,
    } as ActionResult;
  }

  try {
    const res = await auth.api.listUsers({
      query: {},
      headers: await headers(),
    });

    const users = res.users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
    }));
    return { success: true, data: users, message: null } as ActionResult;
  } catch (error: any) {
    return {
      success: false,
      message: error?.message ?? "Unexpected error",
      data: null,
    } as ActionResult;
  }
}
