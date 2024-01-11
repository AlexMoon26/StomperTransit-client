"use client";
import { UserState, selectAuth } from "@/GlobalRedux/Features/authSlice";
import { useAppSelector } from "@/GlobalRedux/hooks";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export const AdminMiddleware = ({ children }: any) => {
  const user = useAppSelector(selectAuth).user as UserState;
  const isLoading = useAppSelector(selectAuth).isLoading;

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }
  if (user?.role !== "admin")
    return (
      <>
        <h1>Доступ запрещен!</h1>
        <Button variant="contained">
          <Link href="/">Вернуться на главную</Link>
        </Button>
      </>
    );
  return <>{children}</>;
};
