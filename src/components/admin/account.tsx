"use client";
import { updateAdmin } from "@/api/admin";
import InputMaskPhone from "@/shared/inputs/InputMaskPhone";
import { UserFull } from "@/types";
import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";

interface Props {
  user: UserFull;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Имя обязательно!"),
  surName: Yup.string().required("Фамилия обязательна!"),
});

export default function Account({ user }: Props) {
  const router = useRouter();
  const formik = useFormik<UserFull>({
    initialValues: {
      _id: user._id || "",
      firstName: user.firstName || "",
      surName: user.surName || "",
      picturePath: user.picturePath || "",
      phone: user.phone || "",
      email: user.email || "",
      role: user.role || "",
      ordersMade: user.ordersMade || 0,
      createdAt: user.createdAt || "",
      updatedAt: user.updatedAt || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        await updateAdmin(values, user._id);
        router.refresh();
        toast.success("Профиль успешно обновлен!");
      } catch (err) {
        console.log(err);
        toast.error("Профиль не был изменен!");
      } finally {
        formik.setSubmitting(false);
      }
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col gap-5 justify-center items-center w-full"
    >
      <Image
        className="rounded-full"
        width={100}
        height={100}
        src={user.picturePath}
        alt="Фото профиля"
      />
      <Box className="flex justify-between w-full gap-5">
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="Имя"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          fullWidth
          id="surName"
          name="surName"
          label="Фамилия"
          value={formik.values.surName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.surName && Boolean(formik.errors.surName)}
          helperText={formik.touched.surName && formik.errors.surName}
        />
      </Box>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Почта"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <InputMaskPhone
        fullWidth
        id="phone"
        name="phone"
        label="Телефон"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <LoadingButton
        type="submit"
        loading={formik.isSubmitting}
        variant="contained"
        fullWidth
        disabled={formik.isSubmitting}
      >
        Сохранить
      </LoadingButton>
    </form>
  );
}
