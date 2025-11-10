import { CreateOrganization } from "@/components/shared/Admin/create-org";
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

  return (
    <div className="">
      Admin
      <CreateOrganization />
    </div>
  );
}
