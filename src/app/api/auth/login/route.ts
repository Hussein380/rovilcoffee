import { NextRequest, NextResponse } from 'next/server';
import { signToken, validateAdminPhone, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone || !validateAdminPhone(phone)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await signToken({ role: 'admin', phone: '0721487948' });

    const response = NextResponse.json({ success: true, token });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
