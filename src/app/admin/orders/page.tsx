"use client";
import { OrderCard } from "@/features/OrderCard";
import React, { useEffect } from "react";

import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "@/GlobalRedux/ordersApi";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import {
  removeLoading,
  selectOrders,
  setAllOrders,
} from "@/GlobalRedux/Features/orderSlice";
import { Loader } from "@/shared/Loader";
import { toast } from "react-toastify";
import { Box, Typography } from "@mui/material";

const OrdersPage = () => {
  const dispatch = useAppDispatch();

  const { data, isSuccess, isError, refetch } = useGetAllOrdersQuery("");
  const [deleteOrder] = useDeleteOrderMutation();

  const handleSuccess = () => {
    if (isSuccess && data) {
      dispatch(setAllOrders(data));
    }
  };

  const handleError = () => {
    if (isError) {
      dispatch(removeLoading());
    }
  };

  useEffect(() => {
    handleSuccess();
    handleError();
  }, [isSuccess, data, isError]);

  const handleUpdateOrder = async () => {
    await refetch();
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder({ id });
      toast.success("Заявка успешно удалена!");
      refetch();
    } catch (error) {
      toast.error("Ошибка при удалении заявки!");
    }
  };

  const { orders, isLoading } = useAppSelector(selectOrders);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
        {orders?.map((order, i) => (
          <OrderCard
            id={order._id}
            clientName={`${order.client?.firstName || ""} ${
              order.client?.surName || ""
            }`}
            pointA={order.pointA}
            pointB={order.pointB}
            date={order.createdAt}
            weight={order.weight!}
            status={order.status}
            key={i}
            driverName={`${order.driver?.firstName || ""} ${
              order.driver?.surName || ""
            }`}
            onDelete={() => handleDeleteOrder(order._id)}
            onUpdate={() => handleUpdateOrder()}
          />
        ))}
      </div>
      {orders.length < 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height="85vh"
          width="100%"
        >
          <Typography fontSize={20}>Заявок нет</Typography>
        </Box>
      )}
    </>
  );
};

export default OrdersPage;
