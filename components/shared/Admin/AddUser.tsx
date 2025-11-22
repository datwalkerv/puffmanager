"use client";

import { addMember } from "@/actions/admin.actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function AddUser({
  orgs,
  users,
}: {
  orgs: { id: string; name: string }[];
  users: { id: string; name: string; email: string }[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [organizationId, setOrganizationId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  async function onSubmit(e: any) {
    e.preventDefault();
    if (!organizationId || !userId) {
      toast.error("Please select organization and user");
      return;
    }

    setLoading(true);

    try {
      const res = await addMember(organizationId, userId);

      if(res.success){
        toast.success("User added successfully");
        router.refresh();
      } else {
        toast.error("Failed to add user");
      } 
    } catch (error) {
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add User</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add User to Organization</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="grid gap-4 mt-4">
          <div className="grid gap-2">
            <Label>Select Organization</Label>

            <Select onValueChange={(value) => setOrganizationId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose organization" />
              </SelectTrigger>

              <SelectContent>
                {orgs.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Select User</Label>

            <Select onValueChange={(value) => setUserId(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choose user" />
              </SelectTrigger>

              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
