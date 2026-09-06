import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const isAdmin = await verifyAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}
