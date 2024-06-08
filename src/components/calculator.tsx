"use client";
import { calcelatePrice } from "@/api/calc";
import {
  BodySize,
  DeliveryOption,
  deliveryOptions,
} from "@/components/orders/deliveryOption";
import { handleSearchPlaces } from "@/config/searchPlaces";
import { Calc, Places, bodyNameMap, bodySizeMap, bodyWeightMap } from "@/types";
import { LoadingButton } from "@mui/lab";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  pointA: Yup.string()
    .required("Точка A обязательна")
    .notOneOf([Yup.ref("pointB"), null], "Точки не должны совпадать"),
  pointB: Yup.string()
    .required("Точка B обязательна")
    .notOneOf([Yup.ref("pointA"), null], "Точки не должны совпадать"),
  weight: Yup.number()
    .required("Вес обязателен")
    .positive("Вес должен быть положительным числом")
    .max(2000, "Вес не должен превышать 2000 кг"),
});

export const Calculator = () => {
  const [places, setPlaces] = useState<Places[]>([]);
  const [price, setPrice] = useState();

  const [bodySize, setBodySize] = useState("");
  const formik = useFormik<Calc>({
    initialValues: {
      pointA: "г Краснодар,",
      pointB: "г Краснодар,",
      typeOfCar: "express",
      bodySize: "",
      movers: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      setPrice(undefined);

      try {
        const response = await calcelatePrice(values);
        if (!response || response.error) throw new Error(response);
        setPrice(response.price);
        toast.success(`Стоимость успешно рассчитана`, { duration: 800 });
      } catch (err) {
        console.log(err);
        toast.error("Стоимость не была создана!");
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const handleSearch = async (search: string) => {
    const fetchedPlaces = await handleSearchPlaces(search);
    setPlaces(fetchedPlaces);
  };

  useEffect(() => {
    if (formik.values.typeOfCar !== "cargo") {
      setBodySize(formik.values.bodySize);
      formik.setFieldValue("bodySize", "");
      formik.setFieldValue("movers", 0);
    } else {
      if (bodySize !== "") {
        formik.setFieldValue("bodySize", bodySize);
      } else {
        formik.setFieldValue("bodySize", "S");
      }
    }
  }, [formik.values.typeOfCar]);
  return (
    <>
      <div className="p-10 w-1/2 bg-white rounded max-lg:w-full max-h-[940px] max-sm:max-h-[1200px] shadow">
        <h5 className="text-xl font-bold text-center mb-5 leading-none text-gray-600">
          Калькулятор расчёта стоимости заказа
        </h5>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-5">
            <Autocomplete
              disablePortal
              options={places}
              color="primary"
              id="pointA"
              noOptionsText="Не найдено"
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              }
              //@ts-ignore
              value={formik.values.pointA}
              getOptionLabel={(option) => {
                if (typeof option === "object") {
                  return option.value || "";
                } else {
                  return option;
                }
              }}
              onChange={(e, value) =>
                formik.setFieldValue("pointA", value ? value.value : "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Точка А"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="г Краснодар, ул Красная, 1"
                  error={formik.touched.pointA && Boolean(formik.errors.pointA)}
                  helperText={formik.errors.pointA && formik.errors.pointA}
                />
              )}
            />
            <Autocomplete
              disablePortal
              options={places}
              color="primary"
              id="pointB"
              noOptionsText="Не найдено"
              isOptionEqualToValue={(option, value) =>
                option.value === value?.value
              }
              //@ts-ignore
              value={formik.values.pointB}
              getOptionLabel={(option) => {
                if (typeof option === "object") {
                  return option.value || "";
                } else {
                  return option;
                }
              }}
              onChange={(e, value) =>
                formik.setFieldValue("pointB", value ? value.value : "")
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Точка Б"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="г Краснодар, ул Красная, 1"
                  error={formik.touched.pointB && Boolean(formik.errors.pointB)}
                  helperText={formik.errors.pointB && formik.errors.pointB}
                />
              )}
            />
            <FormControl>
              <FormLabel className="mb-4">Тип доставки</FormLabel>

              <RadioGroup
                className=" gap-5"
                id="typeOfCar"
                value={formik.values.typeOfCar}
                onChange={formik.handleChange}
              >
                <div className="flex justify-center max-md:flex-col">
                  {deliveryOptions.map((option) => (
                    <DeliveryOption
                      key={option.value}
                      {...option}
                      formik={formik}
                    />
                  ))}
                </div>
              </RadioGroup>
            </FormControl>

            {formik.values.typeOfCar === "cargo" && (
              <>
                <Box className="flex justify-between flex-col bg-gray-100 rounded-xl">
                  <Box className="flex flex-col w-full p-5 justify-center items-center">
                    <Typography>
                      {bodyNameMap[formik.values.bodySize]}
                    </Typography>
                    <Typography className="text-gray-400" fontSize="small">
                      до {bodyWeightMap[formik.values.bodySize]} кг
                    </Typography>
                    <Typography className="text-gray-400" fontSize="small">
                      {bodySizeMap[formik.values.bodySize]}
                    </Typography>
                  </Box>
                  <Box className="bg-gray-200 rounded max-md:w-full h-16 m-5 p-5">
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
                  value={formik.values.movers || ""}
                  onChange={formik.handleChange}
                />
              </>
            )}
          </div>
          <div className="my-10">
            {price && (
              <>
                <div className="flex justify-between">
                  <label className="block mb-2 text-sm font-medium text-gray-400">
                    Примерная стоимость:
                  </label>
                  <label className="block mb-2 text-sm font-medium text-red-400">
                    {price} Р
                  </label>
                </div>
              </>
            )}
          </div>
          <div className="text-center">
            <LoadingButton
              type="submit"
              loading={formik.isSubmitting}
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Рассчитать
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  );
};
