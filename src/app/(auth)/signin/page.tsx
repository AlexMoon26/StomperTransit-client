"use server";
import { cookies } from "next/headers";

import { LoginPage } from "@/components/auth/loginPage";

import { redirect } from "next/navigation";

const Login = () => {
  const token = cookies().get("token")?.value;

  const role = cookies().get("role")?.value;

  if (token && role === "admin") {
    redirect("/");
  }

  return <LoginPage />;
};

export default Login;
