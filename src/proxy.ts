import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {

  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/auth/login");
  const isProtected = pathname.startsWith("/dashboard");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isProtected && token) {
    const resp = await fetch("http://localhost:4000/api/auth/verify-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token })
    });
    const { isValid } = await resp.json();
    if (!isValid) return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/dashboard/:path*"],
};
