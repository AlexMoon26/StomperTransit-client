"use client";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useFormik } from "formik";
import { validationLoginSchema } from "@/config/validation";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useLoginUserMutation } from "@/GlobalRedux/authApi";
import { useAppDispatch } from "@/GlobalRedux/hooks";
import { setUser } from "@/GlobalRedux/Features/authSlice";

import { toast } from "react-toastify";
import Link from "next/link";
import Copyright from "@/shared/Copyright";

const Login = () => {
  const router = useRouter();
  const [loginUser, { data, isSuccess, isError }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: async (values) => {
      try {
        await loginUser(values);
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ token: data.token, user: data.user }));
      toast.success("Успешная авторизация!");
      router.push("/");
    }
  }, [isSuccess, data, dispatch, router]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6}>
        <Box
          sx={{
            mx: "auto",
            maxWidth: "80%",
          }}
        >
          <Box
            sx={{
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#86C232" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Авторизация
            </Typography>
            <form onSubmit={formik.handleSubmit} className="w-full">
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Почта"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Пароль"
                type="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              {isError && (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <p className="text-red-600">Неверный логин или пароль!</p>
                </Box>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </Button>
            </form>
            <Grid container>
              <Grid item xs>
                <Link href="#" className="text-green-500 underline">
                  Забыли пароль?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" className="text-green-500 underline">
                  {"Нет аккаунта? Зарегистрироваться"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
