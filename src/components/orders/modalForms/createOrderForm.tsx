"use client";
import * as Yup from "yup";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "sonner";
import { Order, User, bodySizeMap, bodyWeightMap } from "@/types";
import { createOrder } from "@/api/orders";
import { useEffect, useState } from "react";
import { apiFetch } from "@/config/apiFetch";
import { BodySize, DeliveryOption, deliveryOptions } from "../DeliveryOption";

interface Props {
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({
  client: Yup.object().required("Клиент обязателен"),
  pointA: Yup.string().required("Точка A обязательна"),
  pointB: Yup.string().required("Точка B обязательна"),
  weight: Yup.number()
    .required("Вес обязателен")
    .positive("Вес должен быть положительным числом")
    .max(2000, "Вес не должен превышать 2000 кг"),
});

export function CreateOrderForm({ closeModal }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const formik = useFormik<Order>({
    initialValues: {
      pointA: "",
      pointB: "",
      weight: 0,
      client: undefined,
      typeOfCar: "express",
      bodySize: "S",
      movers: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await createOrder(values);
        if (!response) throw new Error(response);
        toast.success(`Заявка успешно создана`);
        closeModal();
      } catch (err) {
        console.log(err);
        closeModal();
        toast.error("Заявка не была создана!");
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await apiFetch(`users`);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (formik.values.typeOfCar !== "cargo") {
      formik.setFieldValue("bodySize", "");
    } else {
      formik.setFieldValue("bodySize", "S");
    }
  }, [formik.values.typeOfCar]);

  useEffect(() => {
    if (formik.values.weight > 100) {
      formik.setFieldValue("typeOfCar", "cargo");
    }
    if (formik.values.weight < 300) {
      formik.setFieldValue("bodySize", "S");
    }
    if (formik.values.weight > 300) {
      formik.setFieldValue("bodySize", "M");
    }
    if (formik.values.weight > 700) {
      formik.setFieldValue("bodySize", "L");
      formik.setFieldValue("movers", 1);
    }
    if (formik.values.weight > 1500) {
      formik.setFieldValue("bodySize", "XL");
    }
  }, [formik.values.weight]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="p-6">
        <div className="flex flex-col gap-5">
          <Autocomplete
            disablePortal
            id="client"
            loading={!users.filter}
            loadingText="Поиск клиентов..."
            options={users}
            isOptionEqualToValue={(option, value) => option._id === value?._id}
            value={formik.values.client}
            onChange={(e, value) => formik.setFieldValue("client", value)}
            getOptionLabel={(client) => `${client.firstName} ${client.surName}`}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Клиент"
                error={formik.touched.client && Boolean(formik.errors.client)}
                helperText={formik.touched.client && formik.errors.client}
              />
            )}
          />
          <TextField
            color="primary"
            label="Точка А"
            name="pointA"
            id="pointA"
            placeholder="г.Краснодар, ул. Красная, 1"
            value={formik.values.pointA}
            onChange={formik.handleChange}
            onBlur={() =>
              formik.handleBlur({
                target: { name: "updatedFields.pointA" },
              })
            }
            error={formik.touched.pointA && Boolean(formik.errors.pointA)}
          />
          <TextField
            label="Точка B"
            name="pointB"
            id="pointB"
            placeholder="г.Краснодар, ул. Красная, 1"
            value={formik.values.pointB}
            onChange={formik.handleChange}
            onBlur={() =>
              formik.handleBlur({
                target: { name: "updatedFields.pointB" },
              })
            }
            error={formik.touched.pointB && Boolean(formik.errors.pointB)}
          />
          <TextField
            label="Вес"
            name="weight"
            id="weight"
            value={formik.values.weight}
            onChange={formik.handleChange}
            onBlur={() =>
              formik.handleBlur({
                target: { name: "updatedFields.weight" },
              })
            }
            error={formik.touched.weight && Boolean(formik.errors.weight)}
            helperText={formik.touched.weight && formik.errors.weight}
          />
          <FormControl>
            <FormLabel className="mb-4">Тип доставки</FormLabel>

            <RadioGroup
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              id="typeOfCar"
              value={formik.values.typeOfCar}
              onChange={formik.handleChange}
            >
              {deliveryOptions.map((option) => (
                <DeliveryOption
                  key={option.value}
                  {...option}
                  formik={formik}
                />
              ))}
            </RadioGroup>
          </FormControl>

          {formik.values.typeOfCar === "cargo" && (
            <>
              <Box className="flex justify-between bg-gray-100 rounded-xl">
                <Box className="flex flex-col w-1/2 justify-center items-center">
                  <Typography>{bodySizeMap[formik.values.bodySize]}</Typography>
                  <Typography className="text-gray-400" fontSize="small">
                    до {bodyWeightMap[formik.values.bodySize]} кг
                  </Typography>
                </Box>
                <Box className="bg-gray-200 rounded w-1/2 h-16 m-5">
                  <RadioGroup
                    className="flex justify-center items-center h-full"
                    id="typeOfCar"
                    value={formik.values.bodySize}
                    onChange={formik.handleChange}
                    defaultValue={"S"}
                  >
                    <BodySize formik={formik} value="S" />
                    <BodySize formik={formik} value="M" />
                    <BodySize formik={formik} value="L" />
                    <BodySize formik={formik} value="XL" />
                  </RadioGroup>
                </Box>
              </Box>
              <TextField
                type="number"
                label="Количество грузчиков"
                name="movers"
                id="movers"
                value={formik.values.movers}
                onChange={formik.handleChange}
              />
            </>
          )}
        </div>
      </Box>

      {/*footer*/}
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <Button type="submit" variant="contained">
          Создать
        </Button>
      </div>
    </form>
  );
}
