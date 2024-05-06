"use client";
import * as Yup from "yup";
import { UserFull } from "@/types";
import { useFormik } from "formik";
import React from "react";
import { Button, TextField } from "@mui/material";
import InputMaskPhone from "@/shared/inputs/InputMaskPhone";
import { toast } from "sonner";
import { updateDriver } from "@/api/drivers";

interface Props {
  driver: UserFull;
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Имя обязательно!"),
  surName: Yup.string().required("Имя обязательно!"),
});

export function ProfileForm({ driver, closeModal }: Props) {
  const formik = useFormik<UserFull>({
    initialValues: {
      _id: driver._id,
      firstName: driver.firstName,
      surName: driver.surName,
      picturePath: driver.picturePath,
      phone: driver.phone,
      email: driver.email,
      role: driver.role,
      createdAt: driver.createdAt,
      updatedAt: driver.updatedAt,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateDriver(values, driver._id);

        if (!response) throw new Error(response);
        toast.success(`${response.message}`);
        closeModal();
      } catch (err) {
        console.log(err);
        closeModal();
        toast.error("Водитель не был изменен!");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col justify-center items-center gap-5 p-6">
        <TextField
          id="firstName"
          name="firstName"
          label="Имя"
          className="w-full"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          id="surName"
          name="surName"
          label="Фамилия"
          className="w-full"
          value={formik.values.surName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.surName && Boolean(formik.errors.surName)}
          helperText={formik.touched.surName && formik.errors.surName}
        />
        <TextField
          id="email"
          name="email"
          label="Почта"
          className="w-full"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <InputMaskPhone
          id="phone"
          name="phone"
          label="Телефон"
          fullWidth
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />
        {driver.phone && (
          <Button color="warning" href={`tel:${driver.phone}`} fullWidth>
            Созвониться
          </Button>
        )}
        <Button fullWidth type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
}
