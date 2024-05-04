import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { profile } from "./api/auth";

export default async function middleware(req: NextRequest) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  try {
    const response = await profile();

    if (!response) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const role = response.role;

    if (!role) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
    const allowedPaths = ["/", "/orders", "/clients", "/drivers"];
    if (!allowedPaths.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/signin", req.url));
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
  matcher: ["/", "/orders", "/clients", "/drivers"],
};
