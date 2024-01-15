"use client";
import { removeLoading, setUsers } from "@/GlobalRedux/Features/usersSlice";
import { useAppDispatch } from "@/GlobalRedux/hooks";
import { useGetAllClientsMutation } from "@/GlobalRedux/usersApi";
import { InputAutocompleteUsers } from "@/shared/inputs/InputAutocompleteUsers";
import { boxModal } from "@/theme/classes";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import * as Yup from "yup";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useCreateOrderMutation } from "@/GlobalRedux/ordersApi";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  phone: Yup.string().required("Клиент обязателен"),
  pointA: Yup.string().required("Точка A обязательна"),
  pointB: Yup.string().required("Точка B обязательна"),
  weight: Yup.number()
    .required("Вес обязателен")
    .positive("Вес должен быть положительным числом"),
});

const ModalCreateApplication = ({ changeStateModal, open }) => {
  const dispatch = useAppDispatch();
  const [getAllClients, { data, isSuccess, isError }] =
    useGetAllClientsMutation();
  const [createOrder] = useCreateOrderMutation();

  const formik = useFormik({
    initialValues: {
      pointA: "",
      pointB: "",
      weight: 0,
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await createOrder(values);
        changeStateModal();
        toast.success("Заявка успешно создана!");
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        await getAllClients({});
      } catch (error) {
        console.error("Произошла ошибка при получении данных", error);
      }
    };

    fetchUsersData();
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUsers(data));
    }
    if (isError) {
      dispatch(removeLoading());
    }
  }, [isSuccess, data, dispatch, isError]);

  return (
    <Modal
      open={open}
      onClose={changeStateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={boxModal} className="rounded-lg">
          <Box
            id="modal-modal-title"
            className="flex justify-between items-center p-5 border-b"
          >
            <Typography fontSize={20}>Создание заявки</Typography>
            <button
              className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={changeStateModal}
            >
              <span className="bg-transparent opacity-70 text-grey-800 text-2xl block outline-none focus:outline-none hover:text-gray-500">
                ×
              </span>
            </button>
          </Box>
          {/*body*/}
          <div className="relative p-6 flex-auto">
            <div className="flex flex-col gap-5">
              <InputAutocompleteUsers
                users={data}
                name="phone"
                onChange={(event, selectedPhone) => {
                  formik.setFieldValue("phone", selectedPhone);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <TextField
                label="Точка А"
                name="pointA"
                id="pointA"
                placeholder="г.Краснодар, ул. Красная, 1"
                value={formik.values.pointA}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pointA && Boolean(formik.errors.pointA)}
                helperText={formik.touched.pointA && formik.errors.pointA}
              />
              <TextField
                label="Точка B"
                name="pointB"
                id="pointB"
                placeholder="г.Краснодар, ул. Красная, 1"
                value={formik.values.pointB}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pointB && Boolean(formik.errors.pointB)}
                helperText={formik.touched.pointB && formik.errors.pointB}
              />
              <TextField
                label="Вес"
                name="weight"
                id="weight"
                value={formik.values.weight}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
              />
            </div>
          </div>
          {/*footer*/}
          <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
            <Button variant="contained">Добавить пользователя</Button>
            <Button type="submit">Создать</Button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};

export default ModalCreateApplication;
