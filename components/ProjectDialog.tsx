'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean;
    onClose: () => void;
    user?: any;
};

export default function ProjectDialog({ open, onClose, user }: Props) {
    const [orgs, setOrgs] = useState<{ id: string; name: string }[]>([]);
    const [projectName, setProjectName] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Dinamikus organization lista
    useEffect(() => {
        if (!open) return;
        fetch('/api/organizations')
            .then(res => res.json())
            .then(data => setOrgs(data.organizations || []))
            .catch(err => {
                console.error(err);
                setOrgs([]);
            });
    }, [open]);

    // Submit: létrehozás + chat
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!projectName || !selectedOrg) return;

        setLoading(true);
        try {
            // 1️⃣ Projekt létrehozása
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: projectName, organizationId: selectedOrg }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Create project failed');
            const projectId = json.project?.id;

            // 2️⃣ Chat inicializálás a projekthez
            const chatRes = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId }),
            });
            const chatJson = await chatRes.json();
            if (!chatRes.ok) console.warn('Chat init failed', chatJson);

            // 3️⃣ Redirect a projekt oldalára
            onClose();
            router.push(`/projects/${projectId}`);
        } catch (err) {
            console.error('Error creating project', err);
            alert('Hiba történt a projekt létrehozásakor. Nézd meg a konzolt.');
        } finally {
            setLoading(false);
        }
    }

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black bg-opacity-70"
                onClick={onClose}
            />

            {/* Modal panel */}
            <div className="bg-white rounded-xl shadow-lg z-50 w-full max-w-md p-6 relative">
                <h2 className="text-xl font-semibold mb-4">Új projekt létrehozása</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label>
                            Projekt neve
                            <input
                                type="text"
                                value={projectName}
                                onChange={e => setProjectName(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                            />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label>
                            Szervezet
                            <select
                                value={selectedOrg}
                                onChange={e => setSelectedOrg(e.target.value)}
                                required
                                className="w-full border border-gray-300 rounded px-2 py-1 mt-1"
                            >
                                <option value="">-- válassz --</option>
                                {orgs.map(o => (
                                    <option key={o.id} value={o.id}>{o.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="flex gap-2 justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {loading ? 'Létrehozás...' : 'Létrehozás'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Mégse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}