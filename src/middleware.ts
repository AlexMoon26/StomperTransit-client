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
      console.error("Error: Token is missing");
      return NextResponse.redirect(new URL("/signin", req.url));
    }

    const role = await response?.role;

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
  matcher: ["/home", "/orders", "/clients", "/drivers"],
};
