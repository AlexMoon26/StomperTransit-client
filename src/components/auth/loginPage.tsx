"use client";
import {
  Avatar,
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

import { toast } from "sonner";
import Link from "next/link";
import Copyright from "@/shared/Copyright";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

export function LoginPage() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationLoginSchema,
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        const response = await login(values);
        if (!response) {
          throw new Error("Ошибка авторизации");
        }
        toast.success("Успешная авторизация!");
        router.push("/home");
      } catch (err) {
        toast.error(`${err}`);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(/images/truck.png)",
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
              <LoadingButton
                type="submit"
                fullWidth
                loading={formik.isSubmitting}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </LoadingButton>
            </form>
            <Grid container>
              <Grid item xs>
                <Link href="#" className="text-green-500 underline">
                  Забыли пароль?
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
