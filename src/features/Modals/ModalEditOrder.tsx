import { InputAutocompleteStatus } from "@/shared/inputs/InputAutocomleteStatus";
import { boxModal } from "@/theme/classes";
import * as Yup from "yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "@/GlobalRedux/ordersApi";
import { OrderStatus } from "@/types/types";
import { InputAutocompleteUsers } from "@/shared/inputs/InputAutocompleteUsers";
import { useGetAllClientsMutation } from "@/GlobalRedux/usersApi";
import { useEffect } from "react";
import { useAppDispatch } from "@/GlobalRedux/hooks";
import { removeLoading, setUsers } from "@/GlobalRedux/Features/usersSlice";

interface IProps {
  pointA: string;
  pointB: string;
  id: string;
  clientName: string;
  weight: number;
  status: OrderStatus;
  open: boolean;
  driverName?: string;
  changeStateModal: () => void;
  onUpdate: () => void;
}

const validationSchema = Yup.object().shape({
  updatedFields: Yup.object().shape({
    id: Yup.string().required(),
    driver: Yup.string(),
    status: Yup.string().required("Статус обязателен"),
    pointA: Yup.string().required("Точка A обязательна"),
    pointB: Yup.string().required("Точка B обязательна"),
    weight: Yup.number()
      .required("Вес обязателен")
      .positive("Вес должен быть положительным числом"),
  }),
});

const ModalEditOrder = ({
  changeStateModal,
  open,
  clientName,
  status,
  pointA,
  id,
  pointB,
  weight,
  driverName,
  onUpdate,
}: IProps) => {
  const dispatch = useAppDispatch();
  const [updateOrder] = useUpdateOrderMutation();

  const [getAllClients, { data, isSuccess, isError }] =
    useGetAllClientsMutation();

  const formik = useFormik({
    initialValues: {
      updatedFields: {
        id: id,
        status: status,
        pointA: pointA,
        pointB: pointB,
        weight: weight,
        driver: driverName,
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateOrder(values).then(() =>
          toast.success("Заявка успешно изменена!")
        );
        changeStateModal();
        await onUpdate();
      } catch (err) {
        console.log(err);
        toast.error("Заявка не была изменена!");
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
        <Box sx={boxModal} className="rounded-lg box-modal">
          <Box
            id="modal-modal-title"
            className="flex justify-between items-center p-5 border-b"
          >
            <Typography fontSize={20}>Изменение заявки</Typography>
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

          <Box className="p-6">
            <div className="flex gap-5 mb-5">
              <Typography className="">Клиент - {clientName}</Typography>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center  ${
                    status === OrderStatus.Pending && "text-red-700 bg-red-100"
                  } ${
                    status === OrderStatus.InProgress &&
                    "text-green-700 bg-green-100"
                  } ${
                    status === OrderStatus.Completed &&
                    "text-gray-700 bg-gray-100"
                  } text-md font-medium mr-2 px-2.5 py-0.5 rounded-full`}
                >
                  <span
                    className={`w-2 h-2 mr-1 rounded-full ${
                      status === OrderStatus.Pending && "bg-red-700"
                    } ${status === OrderStatus.InProgress && "bg-green-700"} ${
                      status === OrderStatus.Completed && "bg-gray-700"
                    }`}
                  ></span>
                  {status}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <InputAutocompleteStatus
                name="updatedFields.status"
                onChange={(event, selectedStatus) => {
                  formik.setFieldValue("updatedFields.status", selectedStatus);
                }}
                value={formik.values.updatedFields.status}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.updatedFields?.status &&
                  Boolean(formik.errors.updatedFields?.status)
                }
                helperText={
                  formik.touched.updatedFields?.status &&
                  formik.errors.updatedFields?.status
                }
              />
              {formik.values.updatedFields.status === "Выполняется" && (
                <InputAutocompleteUsers
                  users={data}
                  name="driver"
                  onChange={(event, selectedPhone) => {
                    formik.setFieldValue("updatedFields.driver", selectedPhone);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.updatedFields?.driver &&
                    Boolean(formik.errors.updatedFields?.driver)
                  }
                  helperText={
                    formik.touched.updatedFields?.driver &&
                    formik.errors.updatedFields?.driver
                  }
                />
              )}

              <TextField
                label="Точка А"
                name="pointA"
                id="pointA"
                placeholder="г.Краснодар, ул. Красная, 1"
                value={formik.values.updatedFields?.pointA}
                onChange={(e) =>
                  formik.handleChange({
                    target: {
                      name: "updatedFields.pointA",
                      value: e.target.value,
                    },
                  })
                }
                onBlur={() =>
                  formik.handleBlur({
                    target: { name: "updatedFields.pointA" },
                  })
                }
                error={
                  formik.touched.updatedFields?.pointA &&
                  Boolean(formik.errors.updatedFields?.pointA)
                }
                helperText={
                  formik.touched.updatedFields?.pointA &&
                  formik.errors.updatedFields?.pointA
                }
              />
              <TextField
                label="Точка B"
                name="pointB"
                id="pointB"
                placeholder="г.Краснодар, ул. Красная, 1"
                value={formik.values.updatedFields.pointB}
                onChange={(e) =>
                  formik.handleChange({
                    target: {
                      name: "updatedFields.pointB",
                      value: e.target.value,
                    },
                  })
                }
                onBlur={() =>
                  formik.handleBlur({
                    target: { name: "updatedFields.pointB" },
                  })
                }
                error={
                  formik.touched.updatedFields?.pointB &&
                  Boolean(formik.errors.updatedFields?.pointB)
                }
                helperText={
                  formik.touched.updatedFields?.pointB &&
                  formik.errors.updatedFields?.pointB
                }
              />
              <TextField
                label="Вес"
                name="weight"
                id="weight"
                value={formik.values.updatedFields.weight}
                onChange={(e) =>
                  formik.handleChange({
                    target: {
                      name: "updatedFields.weight",
                      value: e.target.value,
                    },
                  })
                }
                onBlur={() =>
                  formik.handleBlur({
                    target: { name: "updatedFields.weight" },
                  })
                }
                error={
                  formik.touched.updatedFields?.weight &&
                  Boolean(formik.errors.updatedFields?.weight)
                }
                helperText={
                  formik.touched.updatedFields?.weight &&
                  formik.errors.updatedFields?.weight
                }
              />
            </div>
          </Box>

          {/*footer*/}
          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <Button type="submit" variant="contained">
              Изменить
            </Button>
          </div>
        </Box>
      </form>
    </Modal>
  );
};

export default ModalEditOrder;
