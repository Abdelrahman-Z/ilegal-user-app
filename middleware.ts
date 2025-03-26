import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { validateToken } from "./utils";

const intlMiddleware = createMiddleware({
  locales: ["en", "ar"], // Define supported locales
  defaultLocale: "en", // Set default locale
});

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Retrieve the auth token from cookies

  const url = req.nextUrl
  const isDashboardRoute = url.pathname.includes(`/dashboard`);
  const isLoginPage = url.pathname.includes(`/login`);
  const isPublicRoute = !isDashboardRoute && !isLoginPage;

  // Validate token
  let isLoggedIn = false;
  if (token) {
    try {
      isLoggedIn = await validateToken(token);
    } catch (error) {
      isLoggedIn = false;
    }
  }

  console.log("isLoggedIn:", isLoggedIn, "Path:", url.pathname);

  // Redirect unauthenticated users trying to access the dashboard
  if (isDashboardRoute && !isLoggedIn) {
    url.pathname = `/${url.locale || "en"}/login`;
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users trying to access the login page
  if (isLoginPage && isLoggedIn) {
    url.pathname = `/${url.locale || "en"}/dashboard/documents`;
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users trying to access public routes
  if (isPublicRoute && isLoggedIn) {
    url.pathname = `/${url.locale || "en"}/dashboard/documents`;
    return NextResponse.redirect(url);
  }

  // Apply locale handling from next-intl
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};