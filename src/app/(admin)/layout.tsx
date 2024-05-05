import { Inter } from "next/font/google";

import { SideBar } from "@/widgets/SideBar";
import { Admin } from "@/types";
import { profile } from "@/api/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stomper Transit",
  description: "Грузоперевозки",
};

export default async function RootLayout({ children }) {
  const user: Admin = await profile();
  return (
    <>
      <SideBar user={user} />
      <div
        id="background-element"
        className="p-8 md:ml-60 min-h-screen bg-gray-200"
      >
        {children}
      </div>
    </>
  );
}
