"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  userId: z.string().min(1, "Please select a user"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export function AddUser() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
    },
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const { data, error } = await authClient.admin.listUsers({
          query: { limit: 100 },
        });
        if (error) {
          toast.error(error.message || "Failed to load users");
        } else {
          setUsers(data?.users || []);
        }
      } catch (err) {
        toast.error("An unexpected error occurred while loading users");
      } finally {
        setUsersLoading(false);
      }
    }
    fetchUsers();
  }, []);
  

  async function onSubmit(formData: FormSchemaType) {
    setLoading(true);
    try {
      // todo
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <UserIcon className="w-5 h-5 text-yellow-500 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User to Organization</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 mt-4">
          <div className="grid gap-3">
            <Label htmlFor="userId">Select User</Label>
            <select
              id="userId"
              required
              {...register("userId")}
              disabled={usersLoading}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="">
                {usersLoading ? "Loading users..." : "Select a user"}
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name || user.email}
                </option>
              ))}
            </select>
            {errors.userId && (
              <p className="text-sm text-red-400">{errors.userId.message}</p>
            )}
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading || usersLoading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
