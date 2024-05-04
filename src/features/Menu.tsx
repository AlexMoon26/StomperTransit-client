import { MenuItems } from "@/shared/MenuItems";
import React from "react";
import home from "../../public/homeImg.svg";
import orders from "../../public/notification.svg";
import clients from "../../public/clients.svg";
import logout from "../../public/images/icons/logout.svg";
import { toast } from "sonner";
import { cookies } from "next/headers";
import { authLogout } from "@/api/auth";

export function Menu({ handleSidebarToggle }) {
  const handleLogout = async () => {
    try {
      const response = await authLogout();
      if (!response) {
        throw new Error("Ошибка при выходе!");
      }
      toast.success("Успешный выход!");
    } catch (err) {
      toast.error(`${err}`);
    }
  };
  return (
    <div className="px-3 py-4 overflow-y-auto ">
      <ul className="space-y-2 font-medium">
        <MenuItems
          name={"Главная"}
          image={home}
          path={"/"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Заявки"}
          image={orders}
          path={"orders"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Клиенты"}
          image={clients}
          path={"clients"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Водители"}
          image={clients}
          path={"drivers"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name="Выйти"
          image={logout}
          onClick={handleLogout}
          path="signin"
        />
      </ul>
    </div>
  );
}
