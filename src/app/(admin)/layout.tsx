import { SideBar } from "@/widgets/SideBar";
import { profile } from "@/api/auth";

export const metadata = {
  title: "Stomper Transit",
  description: "Грузоперевозки",
};

export default async function RootLayout({ children }) {
  const user = await profile();
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
