import * as Yup from "yup";
import { UserFull } from "@/types";
import { useFormik } from "formik";
import React from "react";
import { Button, TextField } from "@mui/material";
import InputMaskPhone from "@/shared/inputs/InputMaskPhone";
import { updateClient } from "@/api/clients";
import { toast } from "sonner";

interface Props {
  client: UserFull;
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Имя обязательно!"),
  surName: Yup.string().required("Имя обязательно!"),
});

export function ProfileForm({ client, closeModal }: Props) {
  const formik = useFormik<UserFull>({
    initialValues: {
      _id: client._id,
      firstName: client.firstName,
      surName: client.surName,
      picturePath: client.picturePath,
      phone: client.phone,
      email: client.email,
      role: client.role,
      ordersMade: client.ordersMade,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await updateClient(values, client._id);
        if (!response) throw new Error(response);
        toast.success(`${response.message}`);
        closeModal();
      } catch (err) {
        console.log(err);
        closeModal();
        toast.error("Клиент не был изменен!");
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
          disabled
          label="Количество заказов"
          className="w-full"
          value={client.ordersMade}
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
        {client.phone && (
          <Button color="warning" href={`tel:${client.phone}`} fullWidth>
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
