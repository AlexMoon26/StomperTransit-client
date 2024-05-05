import React from "react";
import { Box, Radio, Typography } from "@mui/material";
import Image from "next/image";

export const deliveryOptions = [
  {
    value: "express",
    label: "Экспресс",
    image:
      "https://ya-authproxy.taxi.yandex.ru/3.0/getimage?tag=class_express_icon_7&size_hint=9999",
  },
  {
    value: "cargo",
    label: "Грузовой",
    image:
      "https://ya-authproxy.taxi.yandex.ru/3.0/getimage?tag=class_cargo_icon_10&size_hint=9999",
  },
];

export const DeliveryOption: React.FC<DeliveryOptionProps> = ({
  value,
  label,
  image,
  formik,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        borderRadius: 4,
        cursor: "pointer",
        ...(formik.values.typeOfCar === value
          ? { backgroundColor: "#f5f5f5" }
          : {}),
      }}
      onClick={() => formik.setFieldValue("typeOfCar", value)}
    >
      <img
        src={image}
        alt={label}
        style={{ width: 50, height: 20, marginRight: 16 }}
      />
      <Typography variant="body2">{label}</Typography>
      <Radio checked={formik.values.typeOfCar === value} />
    </Box>
  );
};

export const BodySize = ({ value, formik }) => {
  return (
    <Box
      onClick={() => formik.setFieldValue("bodySize", value)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        borderRadius: 3,
        cursor: "pointer",
        backgroundColor: formik.values.bodySize === value ? "#f5f5f5" : "",
        transition:
          "background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#e0e0e0",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Typography>{value}</Typography>
    </Box>
  );
};

interface DeliveryOptionProps {
  value: string;
  label: string;
  image: string;
  formik: any;
}
