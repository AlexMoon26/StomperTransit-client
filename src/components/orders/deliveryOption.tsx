import React from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import { OrderStatus } from "@/types";

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
      <Radio
        disabled={
          OrderStatus[formik.values.status] === "Выполняется" ||
          OrderStatus[formik.values.status] === "Выполнена"
        }
        checked={formik.values.typeOfCar === value}
      />
    </Box>
  );
};

export const BodySize = ({ value, formik }) => {
  return (
    <Box
      onClick={() =>
        formik.values.status
          ? OrderStatus[formik.values.status] === "В ожидании" &&
            formik.setFieldValue("bodySize", value)
          : formik.setFieldValue("bodySize", value)
      }
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

export const Movers = ({ formik }) => {
  return (
    <FormControl>
      <FormLabel className="mb-4">Грузчики</FormLabel>

      <TextField
        disabled={
          OrderStatus[formik.values.status] === "Выполняется" ||
          OrderStatus[formik.values.status] === "Выполнена"
        }
        type="number"
        name="movers"
        id="movers"
        value={formik.values.movers}
        onChange={formik.handleChange}
        inputProps={{ min: 0, max: 2 }}
        variant="outlined"
        fullWidth
      />
    </FormControl>
  );
};

interface DeliveryOptionProps {
  value: string;
  label: string;
  image: string;
  formik: any;
}
