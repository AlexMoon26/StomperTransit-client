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
  Autocomplete,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import InputMaskPhone from "@/shared/inputs/InputMaskPhone";
import { validationRegSchema } from "@/config/validation";

import { useFormik } from "formik";
import { useRegisterUserMutation } from "@/GlobalRedux/authApi";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import { selectAuth, setUser } from "@/GlobalRedux/Features/authSlice";
import { toast } from "react-toastify";

import { names } from "@/data/data";
import Copyright from "@/shared/Copyright";
import Link from "next/link";

const Signup = () => {
  const [registerUser, { data, isSuccess, isError }] =
    useRegisterUserMutation();
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { token } = useAppSelector(selectAuth);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      surName: "",
      email: "",
      phone: "",
      password: "",
    },
    validationSchema: validationRegSchema,
    onSubmit: async (values) => {
      try {
        await registerUser(values);
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser({ token: data.token, user: data.user }));
      toast.success("Успешная регистрация!");
      router.push("/");
    }
  }, [isSuccess, data, dispatch, router]);

  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token, router]);

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
              Регистрация
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Autocomplete
                options={names}
                freeSolo
                getOptionLabel={(option) => option}
                onChange={(event, value) => {
                  formik.handleChange(event);
                  formik.setFieldValue("firstName", value);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    id="firstName"
                    label="Имя"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                )}
              />
              <TextField
                margin="normal"
                fullWidth
                id="surName"
                label="Фамилия"
                name="surName"
                autoComplete="text"
                value={formik.values.surName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.surName && Boolean(formik.errors.surName)}
                helperText={formik.touched.surName && formik.errors.surName}
              />
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
              <InputMaskPhone
                fullWidth
                margin="normal"
                id="phone"
                label="Номер телефона"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Зарегистрироваться
              </Button>
            </form>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" className="text-green-500 underline">
                  {"Уже есть аккаунт? Авторизоваться"}
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

export default Signup;
