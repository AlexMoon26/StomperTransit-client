"use client";
import { UserState, selectAuth } from "@/GlobalRedux/Features/authSlice";
import { useAppSelector } from "@/GlobalRedux/hooks";
import { ErrorForbidden } from "@/shared/pages/ErrorForbidden";
import { Loader } from "@/shared/Loader";

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
