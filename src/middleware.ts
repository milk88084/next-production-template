import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX ?? "100", 10);
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "60000", 10);

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

function cleanupRateLimitMap() {
  const now = Date.now();
  for (const [key, value] of rateLimitMap) {
    if (now - value.timestamp > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }
}

function getCSPHeader(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

export function middleware(request: NextRequest) {
  const ip = getClientIp(request);

  if (request.nextUrl.pathname.startsWith("/api/")) {
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }
  }

  if (rateLimitMap.size > 10000) {
    cleanupRateLimitMap();
  }

  const response = NextResponse.next();

  response.headers.set("Content-Security-Policy", getCSPHeader());
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("X-DNS-Prefetch-Control", "on");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
