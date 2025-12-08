import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  toast.success(`Copied id: ${value}!`);
};

interface KanbanItem {
  id: string;
  content: string;
  projectData?: any;
}

interface KanbanContainer {
  id: string;
  title: string;
  bg: string;
  items: KanbanItem[];
}

export function transformProjectsToKanban(projects: any[]): KanbanContainer[] {
  const containers: Record<string, KanbanContainer> = {
    todo: { 
      id: "todo", 
      title: "To Do", 
      bg: "bg-brown/20", 
      items: [] as KanbanItem[]
    },
    clarification: { 
      id: "clarification", 
      title: "In Clarification", 
      bg: "bg-brown/40", 
      items: [] as KanbanItem[]
    },
    changes: { 
      id: "changes", 
      title: "Change Requested", 
      bg: "bg-brown", 
      items: [] as KanbanItem[]
    },
    progress: { 
      id: "progress", 
      title: "In Progress", 
      bg: "bg-darkyellow/20", 
      items: [] as KanbanItem[]
    },
    review: { 
      id: "review", 
      title: "Review", 
      bg: "bg-darkyellow/30", 
      items: [] as KanbanItem[]
    },
    done: { 
      id: "done", 
      title: "Done", 
      bg: "bg-[#6ab04c]/20", 
      items: [] as KanbanItem[]
    },
  };

  projects.forEach((project) => {
    const status = project.status || "todo";
    if (containers[status as keyof typeof containers]) {
      const item: KanbanItem = {
        id: project._id,
        content: project.name || "Unnamed Project",
        projectData: project,
      };
      containers[status as keyof typeof containers].items.push(item);
    }
  });

  return Object.values(containers);
}