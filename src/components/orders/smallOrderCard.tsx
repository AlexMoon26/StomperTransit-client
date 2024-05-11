"use client";
import { DeliveryStatus, OrderFull, OrderStatus } from "@/types";
import moment from "moment";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import { useContext } from "react";
import { ModalContext } from "@/components/modalContext";
import { EditOrderForm } from "@/components/orders/modalForms/editOrderForm";
import { deleteOrder } from "@/api/orders";
import { toast } from "sonner";
import "moment/locale/ru";

interface Props {
  order: OrderFull;
}

export const SmallOrderCard = ({ order }: Props) => {
  const { openModal, closeModal } = useContext(ModalContext);

  async function handleDeleteOrder() {
    const response = await deleteOrder(order._id);
    if (!response) return toast.error("Удаление заявки не произошло!");
    toast.success("Заявка успешно удалена!");
  }

  const handleOpenEditOrderModal = () => {
    openModal({
      component: EditOrderForm,
      props: { order, closeModal },
      title: "Изменение заявки",
    });
  };
  return (
    <>
      <div
        className={`flex w-full text-xs md:text-sm xxl:text-lg border-l-[8px] rounded-l shadow  ${
          OrderStatus[order.status] === "В ожидании"
            ? "border-l-purple-400"
            : OrderStatus[order.status] === "Выполняется"
            ? "border-l-orange-500"
            : "border-l-green-400"
        }  p-5 rounded bg-white`}
        role="list"
      >
        <Box className="w-full flex flex-col gap-2 justify-center">
          <Box className="flex items-center justify-between">
            <h5 className="text-gray-400 truncate">ID: {order._id}</h5>

            <span
              className={`inline-flex items-center justify-center max-sm:w-1/3  ${
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
          </Box>

          <h5 className="text-gray-400">
            Клиент: {order.client?.surName} {order.client?.firstName}
          </h5>

          <Box>
            <h5 className="text-green-500">
              <span className="text-gray-400">Из</span> {order.pointA}
            </h5>
            <h5 className="text-green-500">
              <span className="text-gray-400">В</span> {order.pointB}
            </h5>
          </Box>

          <h5 className="text-gray-400">
            Дата формирования: {moment(order.createdAt).format("LLL")}
          </h5>
          <h5 className="text-gray-500 dark:text-gray-400">
            Вид доставки: {DeliveryStatus[order.typeOfCar]} {order?.bodySize}
          </h5>
          <Box className="w-full flex justify-end gap-3">
            <IconButton onClick={handleDeleteOrder}>
              <DeleteIcon color="error" />
            </IconButton>
            {OrderStatus[order.status] !== "Выполнена" && (
              <IconButton onClick={handleOpenEditOrderModal}>
                <ModeIcon color="warning" />
              </IconButton>
            )}
          </Box>
        </Box>
      </div>
    </>
  );
};
