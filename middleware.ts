import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { validateToken } from "./utils";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"], // Define supported locales
  defaultLocale: "en", // Set default locale
});

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Retrieve the auth token from cookies

  const url = req.nextUrl.clone(); // Clone URL to avoid mutations
  const isDashboardRoute = url.pathname.includes(`/dashboard`);
  const isLoginPage = url.pathname.includes(`/login`);
  const isPublicRoute = !isDashboardRoute && !isLoginPage;

  // Validate token with better error handling
  let isLoggedIn = false;
  if (token) {
    try {
      isLoggedIn = await validateToken(token);
    } catch (error) {
      console.error("Token validation error:", error);
      // Clear invalid token
      const response = NextResponse.redirect(new URL(`/${url.locale || "en"}/login`, req.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // Add debug logging
  console.log({
    path: url.pathname,
    isLoggedIn,
    isDashboardRoute,
    isLoginPage,
    isPublicRoute,
    hasToken: !!token
  });

  // Redirect unauthenticated users trying to access the dashboard
  if (isDashboardRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL(`/${url.locale || "en"}/login`, req.url));
  }

  // Redirect authenticated users trying to access the login page
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL(`/${url.locale || "en"}/dashboard`, req.url));
  }

  // Redirect authenticated users trying to access public routes
  if (isPublicRoute && isLoggedIn) {
    return NextResponse.redirect(new URL(`/${url.locale || "en"}/dashboard`, req.url));
  }

  // Apply locale handling from next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};