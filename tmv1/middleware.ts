import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("TokenAuth")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  try {
    const decoded = jwt.decode(token) as any;
    const rol = decoded?.RolID;
    const path = request.nextUrl.pathname;

    // Solo administradores
    if (path.startsWith("/admin") && rol !== 4) {
      return NextResponse.redirect(new URL("/denied", request.url));
    }

    // Solo usuarios finales (publicación, reservas, perfil)
    if (path.startsWith("/usuarios") && rol !== 5) {
      return NextResponse.redirect(new URL("/denied", request.url));
    }

    // Solo personal operativo: Guardia (2) y Operador (3)
    if (path.startsWith("/operador") && !(rol === 2 || rol === 3)) {
      return NextResponse.redirect(new URL("/denied", request.url));
    }

  } catch {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/usuarios/:path*", "/operador/:path*"],
};
