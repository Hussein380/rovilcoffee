import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'rovil_jwt_s3cr3t_2024_x9k2mZ');
const COOKIE_NAME = 'rovil_admin_token';
const ADMIN_PHONE = process.env.ADMIN_PHONE || '0721487948';

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export function validateAdminPhone(phone: string): boolean {
  // Normalise: strip spaces and leading zeros or +254 prefix
  const normalise = (p: string) => p.replace(/\s+/g, '').replace(/^\+254/, '0');
  return normalise(phone) === normalise(ADMIN_PHONE);
}

export async function getAdminTokenFromCookies(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAME)?.value;
  } catch {
    return undefined;
  }
}

export async function verifyAdminRequest(request?: NextRequest): Promise<boolean> {
  // 1. Check Bearer token in Authorization header
  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      if (token) {
        const payload = await verifyToken(token);
        if (payload && payload.role === 'admin') return true;
      }
    }

    // 2. Check NextRequest cookies
    const reqCookie = request.cookies.get(COOKIE_NAME)?.value;
    if (reqCookie) {
      const payload = await verifyToken(reqCookie);
      if (payload && payload.role === 'admin') return true;
    }
  }

  // 3. Fallback to next/headers cookies()
  const cookieToken = await getAdminTokenFromCookies();
  if (cookieToken) {
    const payload = await verifyToken(cookieToken);
    return !!(payload && payload.role === 'admin');
  }

  return false;
}

export { COOKIE_NAME };
