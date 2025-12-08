// components/shared/Dashboard/AITaskDialog.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

import { createAITasks } from "@/actions/aitask.actions";

const formSchema = z.object({
  mainTask: z.string().min(5, "Task description must be at least 5 characters"),
  numberOfTasks: z.number().min(2).max(10),
});

interface AITaskDialogProps {
  org: any;
  onTasksCreated?: () => void;
}

export function AITaskDialog({ org, onTasksCreated }: AITaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [previewTasks, setPreviewTasks] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainTask: "",
      numberOfTasks: 3,
    },
  });

  const mainTask = watch("mainTask");
  const numberOfTasks = watch("numberOfTasks");

  const generatePreview = () => {
    if (!mainTask.trim() || mainTask.length < 10) {
      setPreviewTasks([]);
      return;
    }

    const words = mainTask.toLowerCase().split(" ");
    const verbs = [
      "create",
      "design",
      "develop",
      "write",
      "build",
      "plan",
      "analyze",
      "review",
    ];
    const nouns = [
      "video",
      "content",
      "script",
      "storyboard",
      "assets",
      "timeline",
      "review",
    ];

    const preview = [];
    for (let i = 1; i <= Math.min(numberOfTasks, 5); i++) {
      const verb = verbs[Math.floor(Math.random() * verbs.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      preview.push(
        `${
          verb.charAt(0).toUpperCase() + verb.slice(1)
        } ${noun} for "${mainTask.substring(0, 30)}..."`
      );
    }
    setPreviewTasks(preview);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await createAITasks(
        org,
        data.mainTask,
        data.numberOfTasks
      );

      if (result.success) {
        // Use optional chaining to safely access properties
        const count = (result as any).count;
        if (count) {
          toast.success(`Created ${count} AI-generated tasks!`);
        } else {
          toast.success("Tasks created successfully!");
        }

        setOpen(false);

        if (onTasksCreated) {
          onTasksCreated();
        }
      } else {
        const errorMsg =
          (result as any).error ||
          (result as any).message ||
          "Failed to create tasks";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("Failed to create AI tasks");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white"
        >
          <span className="mr-2">🤖</span>
          AI Task Breakdown
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-darkgray border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-blue-400">🤖</span>
            AI Task Breakdown
          </DialogTitle>
          <DialogDescription>
            Let AI break down your complex task into manageable subtasks
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="mainTask">Main Task</Label>
            <Textarea
              id="mainTask"
              {...register("mainTask")}
              placeholder="Describe the main task you want to break down..."
              className="min-h-[100px] bg-black/30 border-white/10"
              onChange={(e) => {
                setValue("mainTask", e.target.value);
                generatePreview();
              }}
            />
            {errors.mainTask && (
              <p className="text-sm text-red-400">{errors.mainTask.message}</p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="numberOfTasks">Number of Subtasks</Label>
              <span className="text-blue-300 font-medium">{numberOfTasks}</span>
            </div>
            <Slider
              defaultValue={[3]}
              min={2}
              max={10}
              step={1}
              onValueChange={(value) => {
                setValue("numberOfTasks", value[0]);
                generatePreview();
              }}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>2</span>
              <span>5</span>
              <span>10</span>
            </div>
            {errors.numberOfTasks && (
              <p className="text-sm text-red-400">
                {errors.numberOfTasks.message}
              </p>
            )}
          </div>

          {/* Preview Section */}
          {previewTasks.length > 0 && (
            <div className="space-y-2">
              <Label className="text-blue-300">AI Preview</Label>
              <div className="space-y-2 bg-black/20 rounded-lg p-3 border border-blue-500/20">
                {previewTasks.map((task, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500 flex-shrink-0" />
                    <span className="text-gray-300">{task}</span>
                  </div>
                ))}
                <p className="text-xs text-gray-400 mt-2">
                  * AI will generate detailed task descriptions
                </p>
              </div>
            </div>
          )}

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !mainTask.trim()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 animate-spin">⟳</span>
                  AI is thinking...
                </>
              ) : (
                <>
                  <span className="mr-2">✨</span>
                  Generate {numberOfTasks} Tasks
                </>
              )}
            </Button>
          </DialogFooter>
        </form>

        <div className="text-xs text-gray-400 text-center mt-4">
          Powered by OpenAI GPT • Tasks will be created in your "To Do" column
        </div>
      </DialogContent>
    </Dialog>
  );
}
