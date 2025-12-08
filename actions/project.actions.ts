"use server";

import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import {
  isAuthenticated,
  notAuthenticatedObject,
} from "@/lib/auth/auth-functions";
import { db } from "@/lib/auth/auth";

export async function createProject(formData: any, org: any) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  const project = {
    name: formData.name,
    deadline: formData.deadline,
    videos: formData.videos,
    brief: formData.brief,
    rawMaterial: formData.raw,
    notes: formData.notes,

    status: "todo",
    assign: org?.metadata?.defaultEditor || null,
    organization: org?.name,
    paid: false,
    price: org?.metadata?.videoPrice || 0,

    createdAt: new Date(),
    updatedAt: new Date(),
    userId: session.user.id,
  };

  const result = await db.collection("projects").insertOne(project);

  revalidatePath("/dashboard");
  return { success: true, id: result.insertedId.toString() };
}

export async function getProjects(organizationName: string) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  const projects = await db
    .collection("projects")
    .find({ organization: organizationName })
    .sort({ createdAt: -1 })
    .toArray();

  const safeProjects = projects.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
  }));

  return safeProjects;
}

export async function updateProjectStatus(projectId: string, newStatus: string) {

  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  try {
    await db.collection("projects").updateOne(
      { _id: new ObjectId(projectId) },
      { 
        $set: { 
          status: newStatus,
          updatedAt: new Date()
        }
      }
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating project status:", error);
    return { success: false, error: "Failed to update project status" };
  }
}

export async function saveMessage(projectId: string, message: string) {

  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  try {
    const newMessage = {
      content: message,
      sender: session.user.name || "User",
      timestamp: new Date(),
    };

    await db.collection("projects").updateOne(
      { _id: new ObjectId(projectId) },
      { 
        $push: { messages: newMessage  as any }
      }
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error saving message:", error);
    return { success: false, error: "Failed to save message" };
  }
}

export async function updateProject(projectId: string, updates: any) {
  "use server";

  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  try {
    await db.collection("projects").updateOne(
      { _id: new ObjectId(projectId) },
      { 
        $set: { 
          ...updates,
          updatedAt: new Date()
        }
      }
    );

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}