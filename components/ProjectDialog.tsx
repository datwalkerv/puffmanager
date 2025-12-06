'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ProjectDialog({ open, onClose }: Props) {
    const [orgs, setOrgs] = useState<{ id: string; name: string }[]>([]);
    const [projectName, setProjectName] = useState('');
    const [selectedOrg, setSelectedOrg] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!open) return;
        fetch('/api/organizations')
            .then(res => res.json())
            .then(data => setOrgs(data.organizations || []))
            .catch(err => { console.error(err); setOrgs([]); });
    }, [open]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!projectName || !selectedOrg) return;

        setLoading(true);
        try {
            // 1) create project
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: projectName, organizationId: selectedOrg }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Create project failed');
            const projectId = json.project?.id;

            // 2) init chat for project
            const chatRes = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ projectId }),
            });
            const chatJson = await chatRes.json();
            if (!chatRes.ok) console.warn('Chat init failed', chatJson);

            // 3) navigate to project page (kanban + chat)
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
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)' }}>
            <div className="modal" style={{ width: 480, margin: '6rem auto', padding: 20, background: '#fff', borderRadius: 8 }}>
                <h2>Új projekt létrehozása</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 10 }}>
                        <label>Projekt neve<br/>
                            <input value={projectName} onChange={e => setProjectName(e.target.value)} required />
                        </label>
                    </div>
                    <div style={{ marginBottom: 10 }}>
                        <label>Szervezet<br/>
                            <select value={selectedOrg} onChange={e => setSelectedOrg(e.target.value)} required>
                                <option value="">-- válassz --</option>
                                {orgs.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                            </select>
                        </label>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button type="submit" disabled={loading}>{loading ? 'Létrehozás...' : 'Létrehozás'}</button>
                        <button type="button" onClick={onClose}>Mégse</button>
                    </div>
                </form>
            </div>
        </div>
    );
}