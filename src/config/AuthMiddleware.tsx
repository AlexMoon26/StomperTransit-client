"use client";
import { selectAuth } from "@/GlobalRedux/Features/authSlice";
import { useAppSelector } from "@/GlobalRedux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const AuthMiddleware = ({ children }) => {
  const router = useRouter();
  const { token } = useAppSelector(selectAuth);

  const isLoading = useAppSelector(selectAuth).isLoading;

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }
  return <>{children}</>;
};
