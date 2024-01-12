"use client";
import { UserState, selectAuth } from "@/GlobalRedux/Features/authSlice";
import { useAppSelector } from "@/GlobalRedux/hooks";
import { ErrorForbidden } from "@/pages/ErrorForbidden";
import { Loader } from "@/shared/Loader";
import { Button } from "@mui/material";
import Link from "next/link";
import React from "react";

export const AdminMiddleware = ({ children }: any) => {
  const user = useAppSelector(selectAuth).user as UserState;
  const isLoading = useAppSelector(selectAuth).isLoading;

  if (isLoading) {
    return <Loader />;
  }
  if (user?.role !== "admin")
    return (
      <>
        <ErrorForbidden />
      </>
    );
  return <>{children}</>;
};
