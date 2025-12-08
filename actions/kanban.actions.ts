"use server";

import {
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

export async function getUserOrganizations() {
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

