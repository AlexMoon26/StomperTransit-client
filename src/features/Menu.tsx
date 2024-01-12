import { MenuItems } from "@/shared/MenuItems";
import React from "react";
import home from "../../public/homeImg.svg";
import orders from "../../public/notification.svg";
import clients from "../../public/clients.svg";
import logout from "../../public/images/icons/logout.svg";

export const Menu = ({ handleSidebarToggle }) => {
  return (
    <div className="px-3 py-4 overflow-y-auto ">
      <ul className="space-y-2 font-medium">
        <MenuItems
          name={"Главная"}
          image={home}
          path={"admin"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Заявки"}
          image={orders}
          path={"admin/orders"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Клиенты"}
          image={clients}
          path={"admin/clients"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Водители"}
          image={clients}
          path={"admin/drivers"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Вернуться на главную"}
          path={"/"}
          image={logout}
          handleSidebarToggle={handleSidebarToggle}
        />
      </ul>
    </div>
  );
};
