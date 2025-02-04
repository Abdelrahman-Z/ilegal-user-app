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
  const isAuthenticated = token ? await validateToken(token) : false;

  // Debug logging
  console.log({
    pathname,
    pathnameWithoutLocale,
    isAuthenticated,
    hasToken: !!token,
  });

  // Define dashboard and public paths
  const isDashboardPath = pathnameWithoutLocale.startsWith("/dashboard");
  const isPublicPath = ["/", "/login"].includes(pathnameWithoutLocale);

  // Authenticated users:
  // - Allow access to dashboard and public pages
  // - Redirect to dashboard if trying to access public pages
  if (isAuthenticated) {
    if (isPublicPath) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard/templates`, request.url));
    }
    return response;
  }

  // Non-authenticated users:
  // - Allow access to public pages
  // - Redirect to login if trying to access dashboard
  if (!isAuthenticated && isPublicPath) {
    return response;
  }
  if (!isAuthenticated && isDashboardPath) {
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
  }

  // If the token is invalid, delete it from the cookie
  if (!isAuthenticated && token) {
    response.cookies.delete("token");
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