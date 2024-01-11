"use client";
import { removeLoading, setUser } from "@/GlobalRedux/Features/authSlice";
import { useGetMeMutation } from "@/GlobalRedux/authApi";
import { useAppDispatch } from "@/GlobalRedux/hooks";
import { useEffect } from "react";

export const Middleware = ({ children }) => {
  const dispatch = useAppDispatch();
  const [getMe, { data, isSuccess, isError }] = useGetMeMutation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await getMe({});
      } catch (error) {
        console.error(
          "Произошла ошибка при получении данных пользователя:",
          error
        );
      }
    };

    fetchUserData();
  }, [getMe]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
    if (isError) {
      dispatch(removeLoading());
    }
  }, [isSuccess, data, dispatch, isError]);
  return <>{children}</>;
};
