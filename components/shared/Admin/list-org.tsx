"use client";

import { authClient } from "@/lib/auth/auth-client";

export function ListOrganizations() {
  const { data: organizations } = authClient.useListOrganizations();

  return (
    <div>
      {organizations && organizations.length > 0 ? (
        organizations.map((org) => <p key={org.id}>{org.name}</p>)
      ) : (
        <p>No organizations found.</p>
      )}
    </div>
  );
}
