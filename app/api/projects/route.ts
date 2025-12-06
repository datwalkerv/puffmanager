import { NextResponse } from 'next/server';
import { createProject } from '@/lib/db';

export async function POST(request: Request) {
    const body = await request.json();
    const { name, organizationId } = body;
    if (!name || !organizationId) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

    const project = await createProject({ name, organizationId });
    // project például: { id: 'proj_123', name, organizationId, createdAt: ... }
    return NextResponse.json({ project });
}