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
import type { Resolver } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { PencilIcon } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  logo: z.string().url("Logo must be a valid URL"),
  defaultEditor: z.string().min(2, "Editor username required"),
  videoPrice: z.coerce.number().min(0, "Video price must be >= 0"),
  editorFee: z.coerce.number().min(0, "Editor fee must be >= 0"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export function CreateOrganization({ org }: { org?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const isEditing = !!org;

  const resolver = zodResolver(formSchema) as Resolver<FormSchemaType>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver,
    defaultValues: {
      name: org?.name ?? "",
      slug: org?.slug ?? "",
      logo: org?.logo ?? "",
      defaultEditor:
        org?.metadata?.defaultEditor ?? org?.defaultEditor ?? "",
      videoPrice: org?.metadata?.videoPrice ?? org?.videoPrice ?? 0,
      editorFee: org?.metadata?.editorFee ?? org?.editorFee ?? 0,
    },
  });

  async function onSubmit(data: FormSchemaType) {
    setLoading(true);
    try {
      if (isEditing) {
        const res = await authClient.organization.update({
          data: {
            name: data.name,
            slug: data.slug,
            logo: data.logo,
            metadata: {
              defaultEditor: data.defaultEditor,
              videoPrice: data.videoPrice,
              editorFee: data.editorFee,
            },
          },
          organizationId: org.id,
        });
        if (res?.error) toast.error(res.error.message);
        else {
          toast.success("Organization updated");
          setOpen(false);
        }
      } else {
        const res = await authClient.organization.create({
          name: data.name,
          slug: data.slug,
          logo: data.logo,
          metadata: {
            defaultEditor: data.defaultEditor,
            videoPrice: data.videoPrice,
            editorFee: data.editorFee,
          },
        });
        if (res?.error) toast.error(res.error.message);
        else {
          toast.success("Organization created");
          setOpen(false);
        }
      }
      router.refresh();
    } catch (e) {
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <button type="button" aria-label="Edit organization" className="p-1">
            <PencilIcon className="w-4 h-4 cursor-pointer hover:text-blue-500" />
          </button>
        ) : (
          <Button variant="outline">Create Organization</Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Organization" : "Create Organization"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update your organization details."
              : "Fill the fields to create a new organization."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4" autoComplete="off">
          <div className="grid gap-3">
            <Label>Name</Label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Slug</Label>
            <Input {...register("slug")} />
            {errors.slug && (
              <p className="text-red-400 text-sm">{errors.slug.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Logo</Label>
            <Input type="url" {...register("logo")} />
            {errors.logo && (
              <p className="text-red-400 text-sm">{errors.logo.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Default Editor (username)</Label>
            <Input {...register("defaultEditor")} />
            {errors.defaultEditor && (
              <p className="text-red-400 text-sm">
                {errors.defaultEditor.message}
              </p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Video Price</Label>
            <Input
              type="number"
              {...register("videoPrice", { valueAsNumber: true })}
            />
            {errors.videoPrice && (
              <p className="text-red-400 text-sm">
                {errors.videoPrice.message}
              </p>
            )}
          </div>

          <div className="grid gap-3">
            <Label>Editor Fee</Label>
            <Input
              type="number"
              {...register("editorFee", { valueAsNumber: true })}
            />
            {errors.editorFee && (
              <p className="text-red-400 text-sm">{errors.editorFee.message}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading
                ? isEditing
                  ? "Saving..."
                  : "Creating..."
                : isEditing
                ? "Save"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}