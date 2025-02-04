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

  let isAuthenticated = await validateToken(token!!);
  if (!isAuthenticated) {
    console.error("Token validation error:");
    response.cookies.delete("token");
  }

  // Debug logging
  console.log({
    pathname,
    pathnameWithoutLocale,
    isAuthenticated,
    hasToken: !!token,
  });

  // Redirect authenticated users away from the root and login page
  if (
    isAuthenticated &&
    (pathnameWithoutLocale === "/" || pathnameWithoutLocale === "/login")
  ) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && pathnameWithoutLocale.startsWith("/auth")) {
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && pathnameWithoutLocale.startsWith("/dashboard")) {
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
