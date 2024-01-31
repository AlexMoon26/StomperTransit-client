"use client";
import {
  UserState,
  logOut,
  selectAuth,
} from "@/GlobalRedux/Features/authSlice";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { toast } from "react-toastify";

import NextLink from "next/link";
import { theme } from "@/theme/theme";
import { Loader } from "@/shared/Loader";
import { Header } from "@/widgets/Header";

const Home = () => {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Успешный выход");
  };

  const user = useAppSelector(selectAuth).user as UserState;

  const isLoading = useAppSelector(selectAuth).isLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box height="100vh" width="100vw">
        <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
          }}
          gap={2}
          mt={20}
        >
          {user && user?._id !== null ? (
            <>
              <Typography textAlign="center">
                Добрый день, {user.firstName}!
              </Typography>
              <Button variant="contained" fullWidth onClick={handleLogOut}>
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
              <Typography textAlign="center">Вы не авторизованы</Typography>
              <Button variant="contained" component={NextLink} href="/signin">
                Авторизоваться
              </Button>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Home;
