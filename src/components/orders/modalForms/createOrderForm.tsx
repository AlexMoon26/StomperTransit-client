/* eslint-disable react-hooks/exhaustive-deps */
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
import {
  Order,
  Places,
  User,
  bodyNameMap,
  bodySizeMap,
  bodyWeightMap,
} from "@/types";
import { createOrder } from "@/api/orders";
import { useEffect, useState } from "react";
import { apiFetch } from "@/config/apiFetch";
import {
  BodySize,
  DeliveryOption,
  Movers,
  deliveryOptions,
} from "../deliveryOption";
import moment, { Moment } from "moment";
import { handleSearchPlaces } from "@/config/searchPlaces";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import { LoadingButton } from "@mui/lab";

interface Props {
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({
  client: Yup.object().required("Клиент обязателен"),
  pointA: Yup.string()
    .required("Точка A обязательна")
    .notOneOf([Yup.ref("pointB"), null], "Точки не должны совпадать"),
  pointB: Yup.string()
    .required("Точка B обязательна")
    .notOneOf([Yup.ref("pointA"), null], "Точки не должны совпадать"),
  approximateTime: Yup.date()
    .required("Ориентировочное время обязательно")
    .min(moment().startOf("day"), "Дата не может быть в прошлом"),
});

export function CreateOrderForm({ closeModal }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [places, setPlaces] = useState<Places[]>([]);

  const [bodySize, setBodySize] = useState("");
  const formik = useFormik<Order>({
    initialValues: {
      pointA: "г Краснодар,",
      pointB: "г Краснодар,",
      client: undefined,
      typeOfCar: "express",
      bodySize: "S",
      movers: 0,
      approximateTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      formik.setSubmitting(true);
      try {
        const response = await createOrder(values);
        if (!response) throw new Error(response);

        toast.success(`Заявка успешно создана`);
        closeModal();
      } catch (err) {
        console.log(err);
        closeModal();
        toast.error("Заявка не была создана!");
      } finally {
        formik.setSubmitting(false);
      }
    },
  });

  const handleSearch = async (search: string) => {
    const fetchedPlaces = await handleSearchPlaces(search);
    setPlaces(fetchedPlaces);
  };

  const setDates = (startDate: Moment, format = "YYYY-MM-DD") => {
    formik.setFieldValue("approximateTime", startDate.format(format));
  };

  const handleTodayClick = () => {
    setDates(moment());
  };
  const handleTommorowClick = () => {
    setDates(moment().add(1, "day"));
  };

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
    <form onSubmit={formik.handleSubmit}>
      <Box className="p-6">
        <div className="flex flex-col gap-5">
          <Autocomplete
            disablePortal
            id="client"
            loading={!users.filter}
            loadingText="Поиск клиентов..."
            options={users}
            isOptionEqualToValue={(option, value) =>
              option.firstName === value?.firstName
            }
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
          <Box className="flex flex-col gap-2">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  className="w-full"
                  label="Ориентировочная дата"
                  name="approximateTime"
                  disablePast
                  value={moment(formik.values.approximateTime)}
                  onChange={(value) =>
                    formik.setFieldValue("approximateTime", value)
                  }
                  slotProps={{
                    textField: {
                      helperText: formik.errors.approximateTime,
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <div className="grid grid-cols-6 max-md:grid-cols-3 items-center gap-5">
              <Button
                variant="outlined"
                size="small"
                onClick={handleTodayClick}
              >
                Сегодня
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={handleTommorowClick}
              >
                Завтра
              </Button>
            </div>
          </Box>
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
              <Box className="flex justify-between max-md:flex-col bg-gray-100 rounded-xl">
                <Box className="flex flex-col w-full p-5 justify-center items-center">
                  <Typography>{bodyNameMap[formik.values.bodySize]}</Typography>
                  <Typography className="text-gray-400" fontSize="small">
                    до {bodyWeightMap[formik.values.bodySize]} кг
                  </Typography>
                  <Typography className="text-gray-400" fontSize="small">
                    {bodySizeMap[formik.values.bodySize]}
                  </Typography>
                </Box>
                <Box className="bg-gray-200 rounded md:w-full h-16 m-5 p-5">
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
              <Movers formik={formik} />
            </>
          )}
        </div>
      </Box>

      {/*footer*/}
      <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
        <LoadingButton
          type="submit"
          loading={formik.isSubmitting}
          variant="contained"
          disabled={formik.isSubmitting}
        >
          Создать
        </LoadingButton>
      </div>
    </form>
  );
}
