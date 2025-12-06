import { NextResponse } from 'next/server';
import { createChatRoomForProject } from '@/lib/db';

export async function POST(request: Request) {
    const { projectId } = await request.json();
    if (!projectId) return NextResponse.json({ error: 'Missing projectId' }, { status: 400 });

    const chatRoom = await createChatRoomForProject(projectId);
    return NextResponse.json({ chatRoom });
}