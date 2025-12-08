"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createProject } from "@/actions/project.actions";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  deadline: z.string().min(1, "Deadline is required"),
  videos: z.number().min(0),
  brief: z.string().url().optional(),
  raw: z.string().url().optional(),
  notes: z.string().optional(),
});

interface AddProjectProps {
  org: any;
  onProjectAdded?: () => void; // Add this line
}

export function AddProject({ org, onProjectAdded }: AddProjectProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      deadline: "",
      videos: 0,
      brief: "",
      raw: "",
      notes: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const result = await createProject(data, org);
      if (result?.success) {
        toast.success("Project created successfully");
        router.push("/dashboard");
        router.refresh();
         if (onProjectAdded) {
          onProjectAdded();
        }
      }
    } catch (err) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Fill out the details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input type="date" id="deadline" {...register("deadline")} />
            {errors.deadline && <p className="text-sm text-red-400">{errors.deadline.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="videos">Number of Videos</Label>
            <Input
              type="number"
              id="videos"
              onChange={(e) => setValue("videos", parseInt(e.target.value))}
            />
            {errors.videos && <p className="text-sm text-red-400">Invalid video count</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="brief">Brief Link</Label>
            <Input id="brief" {...register("brief")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="raw">Raw Material Link</Label>
            <Input id="raw" {...register("raw")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" {...register("notes")} />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}