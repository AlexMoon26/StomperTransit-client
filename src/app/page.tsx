"use client";
import {
  UserState,
  logOut,
  selectAuth,
} from "@/GlobalRedux/Features/authSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import NextLink from "next/link";

export const Home = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Успешный выход");
  };

  const user = useAppSelector(selectAuth).user as UserState;

  const isLoading = useAppSelector(selectAuth).isLoading;

  if (isLoading) {
    return <h2>Загрузка...</h2>;
  }

  return (
    <>
      {user && user?._id !== null ? (
        <>
          <h2>Привет, твои данные:</h2>
          <h3>id: {user?._id}</h3>
          <h3>Имя: {user?.firstName}</h3>
          <h3>Фамилия: {user?.surName}</h3>
          <h3>Телефон: {user?.phone}</h3>
          <h3>Роль: {user?.role}</h3>
          <Button variant="contained" onClick={handleLogOut}>
            Выйти
          </Button>

          {user.role === "admin" && (
            <Button component={NextLink} href="/admin">
              Админ панель
            </Button>
          )}
        </>
      ) : (
        <>
          <h2>Вы не авторизованы</h2>
          <Button variant="contained" component={NextLink} href="/signin">
            Авторизоваться
          </Button>
        </>
      )}
    </>
  );
};

export default Home;
