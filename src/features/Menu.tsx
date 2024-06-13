import { MenuItems } from "@/shared/MenuItems";
import React from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Divider from "@mui/material/Divider";
import { toast } from "sonner";
import { authLogout } from "@/api/auth";

export function Menu({ handleSidebarToggle }) {
  const handleLogout = async () => {
    try {
      const response = await authLogout();
      if (!response.message) {
        throw new Error("Ошибка при выходе!");
      }
      toast.success(`${response.message}`);
    } catch (err) {
      toast.error(`${err}`);
    }
  };
  return (
    <div className="px-3 py-4 overflow-y-auto ">
      <ul className="space-y-2 font-medium">
        <MenuItems
          name={"Главная"}
          Icon={HomeIcon}
          path={"home"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems name="Профиль" Icon={PersonIcon} path="profile" />
        <MenuItems
          name={"Заявки"}
          Icon={NotificationsIcon}
          path={"orders"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Клиенты"}
          Icon={GroupsIcon}
          path={"clients"}
          handleSidebarToggle={handleSidebarToggle}
        />
        <MenuItems
          name={"Водители"}
          Icon={PeopleIcon}
          path={"drivers"}
          handleSidebarToggle={handleSidebarToggle}
        />

        <Divider className="bg-white" variant="middle" component="li" />
        <MenuItems
          name="Выйти"
          Icon={ExitToAppIcon}
          onClick={handleLogout}
          path="signin"
        />
      </ul>
    </div>
  );
}
