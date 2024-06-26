/* eslint-disable react-hooks/exhaustive-deps */
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
  OrderFull,
  OrderStatus,
  Places,
  User,
  bodyNameMap,
  bodySizeMap,
  bodyWeightMap,
} from "@/types";
import { editOrder } from "@/api/orders";
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

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LoadingButton } from "@mui/lab";

interface Props {
  order: OrderFull;
  closeModal: () => void;
}

const validationSchema = Yup.object().shape({
  _id: Yup.string().required(),
  client: Yup.object().required("Клиент обязателен"),
  status: Yup.string().required("Статус обязателен"),
  pointA: Yup.string()
    .required("Точка A обязательна")
    .notOneOf([Yup.ref("pointB"), null], "Точки не должны совпадать"),
  pointB: Yup.string()
    .required("Точка B обязательна")
    .notOneOf([Yup.ref("pointA"), null], "Точки не должны совпадать"),
  approximateTime: Yup.date()
    .required("Ориентировочное время обязательно")
    .min(moment(), "Дата не может быть в прошлом"),
  driver: Yup.object().when(["status"], {
    is: (status: string) => status === "inProgress" || status === "completed",
    then: Yup.object().required("Водитель обязателен"),
  }),
});

export function EditOrderForm({ order, closeModal }: Props) {
  const [drivers, setDrivers] = useState<User[]>([]);
  const [places, setPlaces] = useState<Places[]>([]);
  const formik = useFormik<OrderFull>({
    initialValues: {
      _id: order._id,
      status: order.status,
      pointA: order.pointA,
      pointB: order.pointB,
      client: order.client,
      driver: order.driver,
      typeOfCar: order.typeOfCar,
      bodySize: order.bodySize,
      movers: order.movers,
      approximateTime: order.approximateTime,
      driverStatus: order.driverStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      cost: order.cost,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        formik.setSubmitting(true);
        const response = await editOrder(values, order._id);
        if (response.status === 400) {
          throw new Error(response.data.value);
        }

        toast.success(`${response.message}`);
        closeModal();
      } catch (err) {
        const error = JSON.parse(err.message);
        toast.error(`${error.message}`);
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
        const response = await apiFetch(`drivers/free`);
        setDrivers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, []);

  useEffect(() => {
    if (formik.values.typeOfCar !== "cargo" && !formik.values.bodySize) {
      formik.setFieldValue("bodySize", "S");
    }
  }, [formik.values.typeOfCar]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="p-6">
        <div className="flex gap-5 mb-5">
          <Typography className="">
            Клиент - {order.client!.firstName} {order.client!.surName}
          </Typography>
          <div className="flex items-center">
            <span
              className={`inline-flex items-center  ${
                OrderStatus[order.status] === "В ожидании" &&
                "text-purple-700 bg-purple-100"
              } ${
                OrderStatus[order.status] === "Выполняется" &&
                "text-orange-700 bg-orange-100"
              } ${
                OrderStatus[order.status] === "Выполнена" &&
                "text-green-700 bg-green-100"
              } text-md font-medium mr-2 px-2.5 py-0.5 rounded-full`}
            >
              <span
                className={`w-2 h-2 mr-1 rounded-full ${
                  OrderStatus[order.status] === "В ожидании" && "bg-purple-700"
                } ${
                  OrderStatus[order.status] === "Выполняется" && "bg-orange-700"
                } ${
                  OrderStatus[order.status] === "Выполнена" && "bg-green-700"
                }`}
              ></span>
              {OrderStatus[order.status]}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Autocomplete
            disablePortal
            id="status"
            options={["pending", "inProgress", "completed"]}
            value={formik.values.status}
            onChange={(e, value) => formik.setFieldValue("status", value)}
            getOptionLabel={(option) => OrderStatus[option]}
            renderInput={(params) => <TextField {...params} label="Статус" />}
          />
          {OrderStatus[formik.values.status] !== "В ожидании" && (
            <Autocomplete
              disablePortal
              noOptionsText="Нет свободных водителей"
              id="driver"
              disabled={OrderStatus[formik.values.status] === "Выполнена"}
              options={drivers}
              isOptionEqualToValue={(option, value) =>
                option.firstName === value?.firstName
              }
              value={formik.values.driver}
              onChange={(e, value) => formik.setFieldValue("driver", value)}
              getOptionLabel={(driver) =>
                `${driver.firstName} ${driver.surName}`
              }
              renderInput={(params) => (
                <TextField
                  name="driver"
                  error={formik.touched.driver && Boolean(formik.errors.driver)}
                  helperText={formik.errors.driver && formik.errors.driver}
                  {...params}
                  label="Водитель"
                />
              )}
            />
          )}
          <Autocomplete
            disablePortal
            options={places}
            disabled={
              OrderStatus[formik.values.status] === "Выполняется" ||
              OrderStatus[formik.values.status] === "Выполнена"
            }
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
            disabled={
              OrderStatus[formik.values.status] === "Выполняется" ||
              OrderStatus[formik.values.status] === "Выполнена"
            }
            color="primary"
            noOptionsText="Не найдено"
            id="pointB"
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
                  disabled={
                    OrderStatus[formik.values.status] === "Выполняется" ||
                    OrderStatus[formik.values.status] === "Выполнена"
                  }
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
                disabled={
                  OrderStatus[formik.values.status] === "Выполняется" ||
                  OrderStatus[formik.values.status] === "Выполнена"
                }
                size="small"
                onClick={handleTodayClick}
              >
                Сегодня
              </Button>
              <Button
                variant="outlined"
                disabled={
                  OrderStatus[formik.values.status] === "Выполняется" ||
                  OrderStatus[formik.values.status] === "Выполнена"
                }
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
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
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
              <Box className="flex justify-between max-sm:flex-col max-sm:items-center bg-gray-100 rounded-xl">
                <Box className="flex flex-col w-1/2 max-sm:mt-4 justify-center items-center">
                  <Typography>{bodyNameMap[formik.values.bodySize]}</Typography>
                  <Typography className="text-gray-400" fontSize="small">
                    до {bodyWeightMap[formik.values.bodySize]} кг
                  </Typography>
                  <Typography className="text-gray-400" fontSize="small">
                    {bodySizeMap[formik.values.bodySize]}
                  </Typography>
                </Box>
                <Box className="bg-gray-200 rounded w-1/2 max-sm:w-[80%] h-16 m-5">
                  <RadioGroup
                    className="flex justify-center items-center h-full"
                    id="typeOfCar"
                    value={formik.values.typeOfCar}
                    onChange={formik.handleChange}
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
          Изменить
        </LoadingButton>
      </div>
    </form>
  );
}
