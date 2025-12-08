"use client";

import { deleteOrganization, removeMember } from "@/actions/admin.actions";
import { TrashIcon, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { CreateOrganization } from "./CreateOrganization";

export default function OrganizationItem({ org }: { org: any }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = (orgId: string) => {
    startTransition(async () => {
      const res = await deleteOrganization(orgId);

      if (res.success) {
        toast.success("Organization deleted successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to delete organization");
      }
    });
  };

  const handleRemoveMember = (memberId: string) => {
    startTransition(async () => {
      const res = await removeMember(org.id, memberId);

      if (res.success) {
        toast.success("Member removed successfully");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to remove member");
      }
    });
  };

  return (
    <div className="flex flex-col border border-white/10 rounded-md overflow-hidden">
      <div className="w-2xl bg-white/5 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>
            {org.name} <span className="italic">({org.slug})</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* EDIT ICON */}
          <CreateOrganization org={org} />

          {/* DELETE ICON */}
          <TrashIcon
            className={`w-4 h-4 cursor-pointer hover:text-red-600 ${
              isPending ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleDelete(org.id)}
          />
        </div>
      </div>

      <div className="text-gray">
        {org.members && org.members.length > 0 ? (
          org.members.map((member: any) => (
            <div
              key={member.id}
              className="w-2xl mx-auto border-t border-white/10 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>
                  {member.user.name}{" "}
                  <span className="italic">({member.user.email})</span>
                  {" - "}
                  <span className="opacity-50">{member.role}</span>
                </span>
              </div>

              <TrashIcon
                className="w-4 h-4 cursor-pointer hover:text-red-600"
                onClick={() => handleRemoveMember(member.id)}
              />
            </div>
          ))
        ) : (
          <div className="w-2xl mx-auto border border-white/10 px-4 py-2">
            No members found.
          </div>
        )}
      </div>
    </div>
  );
}
