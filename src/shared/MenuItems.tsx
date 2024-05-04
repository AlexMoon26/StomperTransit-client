import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IProps {
  name: string;
  image?: string;
  path?: string;
  handleSidebarToggle?: () => void;
  onClick?: () => void;
}

export const MenuItems = ({
  name,
  image,
  path,
  handleSidebarToggle,
  onClick,
}: IProps) => {
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
        {image && (
          <Image src={image} alt={name} className="w-6 h-6 fill-red-600" />
        )}
        <span className="ml-3">{name}</span>
      </Link>
    </li>
  );
};
