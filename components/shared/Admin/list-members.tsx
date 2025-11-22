"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth/auth-client";
import { TrashIcon } from "lucide-react";

export default function ListMembers({
  organizationId,
}: {
  organizationId: string;
}) {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        const { data, error } = await authClient.organization.listMembers({
          query: { organizationId },
        });

        if (error) {
          setError(error.message || "Failed to load members.");
        } else {
          setMembers(data?.members || []);
        }
      } catch (err: any) {
        setError(err.message || "Unexpected error.");
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [organizationId]);

  if (loading) return <p className="ml-4">Loading members...</p>;
  if (error) return <p className="ml-4 text-red-500">{error}</p>;

  return (
    <div className="w-[90%] mx-auto bg-white/2 border border-white/10 p-2 px-6">
      {members.length > 0 ? (
        members.map((member) => (
          <div key={member.id} className="flex justify-between items-center">
            <div>
              {member.user.name} ({member.user.email}) - {member.role}
            </div>
            <TrashIcon
              className="w-5 h-5 text-red-500/50 cursor-pointer"
              onClick={async () => {
                const { error } = await authClient.organization.removeMember({
                  organizationId: organizationId,
                  memberIdOrEmail: member.user.id,
                });
                if (error) {
                  setError(error.message || "Unable to remove member");
                } else {
                  setMembers((prev) =>
                    prev.filter((m) => m.user.id !== member.user.id)
                  );
                }
              }}
            />
          </div>
        ))
      ) : (
        <p className="ml-4">No members found.</p>
      )}
    </div>
  );
}
