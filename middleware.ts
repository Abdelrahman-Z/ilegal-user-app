import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { validateToken } from "./utils";

// Create the intl middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Strip locale from pathname for checking routes
  const pathnameWithoutLocale = pathname.replace(/^\/(?:en|ar)/, "");

  // First, handle the locale
  const response = await intlMiddleware(request);
  const locale = response.headers.get("x-middleware-request-locale") || "en";

  // Validate authentication

  // Debug logging
  console.log({
    pathname,
    pathnameWithoutLocale,
    hasToken: !!token,
  });

  // Define dashboard and public paths
  const isDashboardPath = pathnameWithoutLocale.startsWith("/dashboard");
  const isPublicPath = ["/", "/login"].includes(pathnameWithoutLocale);

  // Authenticated users:
  // - Allow access to dashboard and public pages
  // - Redirect to dashboard if trying to access public pages
  if (token) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard/templates`, request.url));
    }
    return response;
  }

  // Non-authenticated users:
  // - Allow access to public pages
  // - Redirect to login if trying to access dashboard
  if (!token && isPublicPath) {
    return response;
  }
  if (!token && isDashboardPath) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }



  // Return the intl middleware response for all other cases
  return response;
}

export const config = {
  matcher: [
    // Match all locales
    "/(ar|en)/:path*",
    // Match root path
    "/",
  ],
};