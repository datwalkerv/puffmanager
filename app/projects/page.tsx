import { getCurrentUser, getRole, isAuthenticated } from "@/lib/auth/auth-functions";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const valid = await isAuthenticated();
  const user = await getCurrentUser();
  if (!valid || !user) redirect("/login");

  return <div className="">Projects</div>;
}
