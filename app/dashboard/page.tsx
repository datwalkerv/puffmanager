import { getCurrentUser, isAuthenticated } from "@/lib/auth/auth-functions";
import { redirect } from "next/navigation";
import Kanban from "./Kanban";
import { getUserOrganizations } from "@/actions/kanban.actions";

export default async function Dashboard() {
    const valid = await isAuthenticated();
    const user = await getCurrentUser();

    if (!valid || !user) {
        redirect("/login");
    }

    const userOrganizations = await getUserOrganizations();
    
    const clientOrganization = userOrganizations?.data[0];

    return (
        <div className="min-h-screen py-12">
            <h1 className="text-3xl font-header text-yellow mb-4 text-center">
                Dashboard
            </h1>

            <Kanban org={clientOrganization} />
        </div>
    );
}
