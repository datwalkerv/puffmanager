"use server";

import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { isAuthenticated, notAuthenticatedObject } from "@/lib/auth/auth-functions";
import { db } from "@/lib/auth/auth";
import { ObjectId } from "mongodb";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function createAITasks(org: any, mainTask: string, numberOfTasks: number) {
  const session = await isAuthenticated();
  if (!session) return notAuthenticatedObject;

  try {
    // Direct task generation without complex parsing
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "user",
          content: `Create ${numberOfTasks} subtasks for: "${mainTask}". 
          Format each as: "TASK: [task name] | DESC: [description]"`
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiResponse = completion.choices[0].message.content || "";
    const subtasks = [];
    
    // Split by lines and look for TASK: pattern
    const lines = aiResponse.split('\n');
    for (const line of lines) {
      const taskMatch = line.match(/TASK:\s*(.+?)(?:\s*\|\s*DESC:\s*(.+))?$/i);
      if (taskMatch) {
        const [, name, description] = taskMatch;
        subtasks.push({
          name: name.trim(),
          description: description ? description.trim() : `Part of: ${mainTask}`
        });
      }
    }

    // Fallback: Create simple tasks if AI fails
    if (subtasks.length === 0) {
      for (let i = 1; i <= numberOfTasks; i++) {
        subtasks.push({
          name: `${mainTask} - Part ${i}`,
          description: `Component ${i} of the main task`
        });
      }
    }

    // Create projects in database
    const createdTasks = [];
    for (const subtask of subtasks.slice(0, numberOfTasks)) {
      const project = {
        name: subtask.name.length > 100 ? subtask.name.substring(0, 97) + "..." : subtask.name,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        videos: 0,
        brief: "",
        rawMaterial: "",
        notes: subtask.description,
        
        status: "todo",
        assign: org?.metadata?.defaultEditor || null,
        organization: org?.name,
        paid: false,
        price: org?.metadata?.videoPrice || 0,

        createdAt: new Date(),
        updatedAt: new Date(),
        userId: session.user.id,
        
        parentTask: mainTask,
        isSubtask: true,
      };

      const result = await db.collection("projects").insertOne(project);
      createdTasks.push({
        id: result.insertedId.toString(),
        name: project.name
      });
    }

    revalidatePath("/dashboard");
    return { 
      success: true, 
      tasks: createdTasks,
      count: createdTasks.length
    };

  } catch (error) {
    console.error("Error creating AI tasks:", error);
    
    // Even if AI fails, create basic tasks
    try {
      const createdTasks = [];
      for (let i = 1; i <= numberOfTasks; i++) {
        const project = {
          name: `${mainTask} - Part ${i}`,
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          videos: 0,
          brief: "",
          rawMaterial: "",
          notes: `Component ${i} of: ${mainTask}`,
          
          status: "todo",
          assign: org?.metadata?.defaultEditor || null,
          organization: org?.name,
          paid: false,
          price: org?.metadata?.videoPrice || 0,

          createdAt: new Date(),
          updatedAt: new Date(),
          userId: session.user.id,
          
          parentTask: mainTask,
          isSubtask: true,
        };

        const result = await db.collection("projects").insertOne(project);
        createdTasks.push({
          id: result.insertedId.toString(),
          name: project.name
        });
      }

      revalidatePath("/dashboard");
      return { 
        success: true, 
        tasks: createdTasks,
        count: createdTasks.length
      };
      
    } catch (fallbackError) {
      return { 
        success: false, 
        error: "Failed to create tasks even with fallback" 
      };
    }
  }
}