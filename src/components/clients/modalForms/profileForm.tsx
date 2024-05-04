import * as Yup from "yup";
import { User } from "@/types";
import { useFormik } from "formik";
import React from "react";
import { Button, TextField } from "@mui/material";
import InputMaskPhone from "@/shared/inputs/InputMaskPhone";

interface Props {
  client: User;
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({});

export function ProfileForm({ client, closeModal }: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-6">
      <TextField
        disabled
        label="Имя"
        className="w-full"
        value={client.firstName}
      />
      <TextField
        disabled
        label="Фамилия"
        className="w-full"
        value={client.surName}
      />
      <TextField
        disabled
        label="Почта"
        className="w-full"
        value={client.email}
      />
      <InputMaskPhone disabled label="Телефон" fullWidth value={client.phone} />
      {client.phone && (
        <Button href={`tel:${client.phone}`} fullWidth>
          Созвониться
        </Button>
      )}
    </div>
  );
}
