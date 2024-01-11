"use client";
import React from "react";
import { Avatar } from "@/shared/Avatar";
import { useAppSelector } from "@/GlobalRedux/hooks";
import { selectAuth } from "@/GlobalRedux/Features/authSlice";

export const Profile = () => {
  const user = useAppSelector(selectAuth).user;
  return (
    <div className="flex gap-3 items-center p-4 bg-grey-800">
      <Avatar src={user?.picturePath} alt={"Аватар пользователя"} />
      <p className="text-white text-center">{user?.firstName}</p>
    </div>
  );
};
