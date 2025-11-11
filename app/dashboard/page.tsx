import { getCurrentUser, getRole, isAuthenticated } from "@/lib/auth/auth-functions";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const valid = await isAuthenticated();
    const user = await getCurrentUser();

    if (!valid || !user) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-4">
                Dashboard
            </h1>
        </div>
    );
}
