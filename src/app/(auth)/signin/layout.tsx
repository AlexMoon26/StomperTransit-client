import { profile } from "@/api/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Stomper Transit | Авторизация",
  description: "Авторизация",
};

export default async function AuthLayout({ children }) {
  const user = await profile();
  if (user && user.role === "admin") {
    redirect("/");
  }
  return <div>{children} </div>;
}
