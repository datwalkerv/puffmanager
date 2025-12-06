import { getCurrentUser, isAuthenticated } from "@/lib/auth/auth-functions";
import { redirect } from "next/navigation";
import ProjectsClientPage from "./ProjectsClientPage";

export default async function Dashboard() {
    const valid = await isAuthenticated();
    const user = await getCurrentUser();

    if (!valid || !user) redirect("/login");

    return <ProjectsClientPage user={user} />;
}