import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { validateToken } from "./utils";

// Create the intl middleware
const intlMiddleware = createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
});

// Define public routes that don't require authentication
const publicRoutes = [
  '/login',
  '/aboutUs',
  '/contactUs',
  '/pricing',
  '/privacy-policy',
  '/services',
  '/team',
  '/terms-and-conditions',
  '/'
];

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;
  
  // Handle locale-stripped pathname for checking routes
  const pathnameWithoutLocale = pathname.replace(/^\/(?:en|ar)/, '');
  
  // Determine route type
  const isPublicRoute = publicRoutes.some(route => pathnameWithoutLocale === route);
  const isDashboardRoute = pathnameWithoutLocale.startsWith('/dashboard');
  const isLoginPage = pathnameWithoutLocale === '/login';

  // First, handle the locale using next-intl
  const response = await intlMiddleware(req);
  
  // Validate token if exists
  let isLoggedIn = false;
  if (token) {
    try {
      isLoggedIn = await validateToken(token);
    } catch (error) {
      console.error("Token validation error:", error);
      // Clear invalid token
      response.cookies.delete("token");
      isLoggedIn = false;
    }
  }

  // Debug logging
  console.log({
    pathname,
    pathnameWithoutLocale,
    isLoggedIn,
    isDashboardRoute,
    isLoginPage,
    isPublicRoute,
    hasToken: !!token
  });

  const locale = response.headers.get('x-middleware-request-locale') || 'en';

  // Handle redirects
  if (isDashboardRoute && !isLoggedIn) {
    // Redirect to login if trying to access dashboard while not logged in
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isLoginPage && isLoggedIn) {
    // Redirect to dashboard if trying to access login while logged in
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, req.url));
  }

  // Return the intl middleware response
  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    // '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
    // Match all locales
    '/(ar|en)/:path*',
    // Match root path
    '/'
  ],
};