// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token");

  // Permitir rutas públicas
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Si no hay token, redirigir al login
  if (!token || !token.value) {
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);

    // Opcional: limpiar cookie
    response.cookies.set("token", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
