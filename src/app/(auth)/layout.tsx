import { AuthMiddleware } from "@/config/AuthMiddleware";
import React from "react";

export default function AuthLayout({ children }) {
  return <AuthMiddleware>{children}</AuthMiddleware>;
}
