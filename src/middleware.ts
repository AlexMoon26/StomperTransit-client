import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { profile } from "./api/auth";

export default async function middleware(req: NextRequest) {
  const token = cookies().get("token")?.value;
  const url = new URL(req.url);
  const path = url.pathname;

  if (!token) {
    // Разрешить доступ к /signin без токена, запретить доступ к остальному
    if (path === "/signin") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const response = await profile();



    if (!response.ok) {
      console.error("Error: Token is missing or invalid");
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const role = response.role;

    // Если пользователь пытается попасть на /signin с валидным токеном — редирект на /home
    if (path === "/signin") {
      return NextResponse.redirect(new URL("/home", req.url));
    }
    if (role === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/signin", req.url));
  }
}

export const config = {
  matcher: ["/home", "/orders", "/clients", "/drivers", "/signin", "/profile"],
};
