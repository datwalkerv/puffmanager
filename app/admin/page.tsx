import { addMember, getMembers, getOrganizations, listUsers } from "@/actions/admin.actions";
import { AddUser } from "@/components/shared/Admin/AddUser";
import { CreateOrganization } from "@/components/shared/Admin/CreateOrganization";
import OrganizationItem from "@/components/shared/Admin/OrganizationItem";
import {
  getCurrentUser,
  isAdmin,
  isAuthenticated,
} from "@/lib/auth/auth-functions";
import { redirect } from "next/navigation";


export default async function Dashboard() {
  const valid = await isAuthenticated();
  const user = await getCurrentUser();
  const admin = await isAdmin();
  if (!valid || !user || !admin) redirect("/login");

  const organizations = await getOrganizations();
  const users = await listUsers();

  const organizationsWithMembers = await Promise.all(
    organizations.data.map(async (org: any) => {
      const members = await getMembers(org.id);
      return {
        ...org,
        members: members.data.members,
      };
    })
  );


  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-header text-yellow text-center">Admin</h1>
      <div className="mx-auto flex gap-2">
        <CreateOrganization />
        <AddUser orgs={organizations.data} users={users.data} />
      </div>
      <div className="flex flex-col gap-4">
        {organizationsWithMembers.length > 0 ? (
          organizationsWithMembers.map((org: any) => (
            <OrganizationItem key={org.id} org={org} />
          ))
        ) : (
          <p className="text-white">No organizations found.</p>
        )}
      </div>
    </div>
  );
}
