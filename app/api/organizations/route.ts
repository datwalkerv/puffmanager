import { NextResponse } from 'next/server';
import { getOrganizations } from '@/lib/db';

export async function GET() {
    const orgs = await getOrganizations();
    return NextResponse.json({ organizations: orgs });
}