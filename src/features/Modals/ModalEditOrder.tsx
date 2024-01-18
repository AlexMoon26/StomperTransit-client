import { InputAutocompleteStatus } from "@/shared/inputs/InputAutocomleteStatus";
import { boxModal } from "@/theme/classes";
import * as Yup from "yup";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useUpdateOrderMutation } from "@/GlobalRedux/ordersApi";
import { OrderStatus } from "@/types/types";

interface IProps {
  pointA: string;
  pointB: string;
  id: string;
  clientName: string;
  weight: number;
  status: OrderStatus;
  open: boolean;
  changeStateModal: () => void;
  onUpdate: () => void;
}

const validationSchema = Yup.object().shape({
  updatedFields: Yup.object().shape({
    id: Yup.string().required(),
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
  onUpdate,
}: IProps) => {
  const [updateOrder] = useUpdateOrderMutation();

  const formik = useFormik({
    initialValues: {
      updatedFields: {
        id: id,
        status: status,
        pointA: pointA,
        pointB: pointB,
        weight: weight,
      },
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        updateOrder(values);
        changeStateModal();
        onUpdate();
        toast.success("Заявка успешно изменена!");
      } catch (err) {
        console.log(err);
        toast.error("Заявка не была изменена!");
      }
    },
  });
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
                <span className="inline-flex items-center bg-red-100 text-red-700 text-md font-medium mr-2 px-2.5 py-0.5 rounded-full">
                  <span className="w-2 h-2 mr-1 rounded-full bg-red-400"></span>
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

              <TextField
                label="Точка А"
                name="pointA"
                id="pointA"
                placeholder="г.Краснодар, ул. Красная, 1"
                value={formik.values.updatedFields.pointA}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
