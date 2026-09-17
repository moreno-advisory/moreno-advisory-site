import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/privacy-policy") {
    return NextResponse.rewrite(new URL("/en/privacy-policy", request.url));
  }

  return handleI18n(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|assets|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js)).*)",
  ],
};
