"use client";
import * as Yup from "yup";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "sonner";
import { User } from "@/types";
import { createClient } from "@/api/clients";
import InputMaskPhone from "@/shared/inputs/InputMaskPhone";
import { LoadingButton } from "@mui/lab";
import { createDriver } from "@/api/drivers";

interface Props {
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Имя обязательно"),
  surName: Yup.string().required("Фамилия обязательна"),
});

export function CreateDriverForm({ closeModal }: Props) {
  const formik = useFormik<User>({
    initialValues: {
      firstName: "",
      surName: "",
      phone: "",
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        const response = await createDriver(values);
        if (response.error) throw new Error(response.error);
        toast.success(`Водитель успешно создан`);

        closeModal();
      } catch (err) {
        closeModal();
        toast.error(`${err}`);
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="p-6">
        <div className="flex flex-col gap-5">
          <TextField
            label="Имя"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            fullWidth
            value={formik.values.firstName}
            onBlur={() =>
              formik.handleBlur({
                target: { name: "updatedFields.firstName" },
              })
            }
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            label="Фамилия"
            id="surName"
            name="surName"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.surName}
            onBlur={() =>
              formik.handleBlur({
                target: { name: "updatedFields.surName" },
              })
            }
            error={formik.touched.surName && Boolean(formik.errors.surName)}
            helperText={formik.touched.surName && formik.errors.surName}
          />
          <TextField
            label="Почта"
            id="email"
            name="email"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={() =>
              formik.handleBlur({
                target: { name: "updatedFields.email" },
              })
            }
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <InputMaskPhone
            label="Телефон"
            id="phone"
            name="phone"
            fullWidth
            onChange={formik.handleChange}
            disabled={false}
            value={formik.values.phone}
            onBlur={() =>
              formik.handleBlur({
                target: { name: "updatedFields.phone" },
              })
            }
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </div>
      </Box>

      {/*footer*/}
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <LoadingButton
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting}
          type="submit"
          variant="contained"
        >
          Создать водителя
        </LoadingButton>
      </div>
    </form>
  );
}
