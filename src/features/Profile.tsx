"use client";
import React from "react";
import { Avatar } from "@/shared/Avatar";
import { Admin } from "@/types";

interface Props {
  user: Admin;
}

export const Profile = ({ user }: Props) => {
  return (
    <div className="flex gap-3 items-center p-4 bg-grey-800">
      <Avatar
        src={user?.picturePath || "/images/profile.png"}
        alt={"Аватар пользователя"}
      />
      <p className="text-white text-center">{user?.firstName}</p>
    </div>
  );
};
