'use client';

import { useState } from "react";
import ProjectDialog from "@/components/ProjectDialog";

export default function ProjectsClientPage({ user }: { user: any }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="p-6">

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Projects</h1>

                <button
                    onClick={() => setOpen(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                >
                    Create Project
                </button>
            </div>

            {/* PROJECT DIALOG */}
            <ProjectDialog open={open} onClose={() => setOpen(false)} user={user} />

            <div className="text-gray-500">
                No projects yet.
            </div>
        </div>
    );
}