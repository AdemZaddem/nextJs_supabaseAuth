import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import type { Role } from "./types";
import { hasPermission } from "./lib/permission";

export default async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = (user?.app_metadata.role ?? user?.user_metadata.role) as Role;

  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  if (user && isAuthPage)
    return NextResponse.redirect(new URL("/dashboard", request.url));
  if (!user && (isDashboard || isAdminRoute))
    return NextResponse.redirect(new URL("/login", request.url));
  if (user && isAdminRoute && !hasPermission(role, "ADMIN"))
    return NextResponse.redirect(new URL("/dashboard", request.url));
  return supabaseResponse;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/auth/callback","/admin/:path*"],
};
