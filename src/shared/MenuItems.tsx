"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface IProps {
  name: string;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  path?: string;
  handleSidebarToggle?: () => void;
  onClick?: () => void;
}

export const MenuItems = ({ name, path, Icon, onClick }: IProps) => {
  const pathname = usePathname();

  const isCurrentPage = (page) => {
    return pathname!.endsWith(page);
  };

  return (
    <li>
      <Link
        onClick={onClick}
        href={`/${path}`}
        className={`flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          isCurrentPage(path)
            ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
            : "text-gray-400"
        }`}
      >
        {Icon && <Icon className="text-white" />}

        <span className="ml-3">{name}</span>
      </Link>
    </li>
  );
};
