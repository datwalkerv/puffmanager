"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  logo: z.string().url("Logo must be a valid URL"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function AddProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
    },
  });

  async function onSubmit(formData: FormSchemaType) {
    setLoading(true);
    try {
      const { data, error } = await authClient.organization.create({
        name: formData.name,
        slug: formData.slug,
        logo: formData.logo,
      });

      if (error) {
        toast.error(error.message || "Unable to create organization");
      } else {
        toast.success("Organization created");
        router.refresh();
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Make changes to your organization here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" required {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" type="text" required {...register("slug")} />
            {errors.slug && (
              <p className="text-sm text-red-400">{errors.slug.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="logo">Logo</Label>
            <Input id="logo" type="url" required {...register("logo")} />
            {errors.logo && (
              <p className="text-sm text-red-400">{errors.logo.message}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Organization"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
