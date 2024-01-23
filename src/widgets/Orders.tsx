"use client";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "@/GlobalRedux/ordersApi";
import { OrderCard } from "@/features/OrderCard";
import { Loader } from "@/shared/Loader";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

export const Orders = () => {
  const [deleteOrder] = useDeleteOrderMutation();
  const { data, isLoading, refetch } = useGetAllOrdersQuery({
    status: "В ожидании",
    limit: 3,
  });

  useEffect(() => {
    refetch();
  }, []);

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

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.length < 1 && (
        <Box className="flex bg-white justify-center h-full items-center">
          Нет заявок в ожидании
        </Box>
      )}
      {data?.map((order, i) => (
        <OrderCard
          key={i}
          clientName={order.client.firstName}
          id={order._id}
          pointA={order.pointA}
          pointB={order.pointB}
          weight={order.weight}
          date={order.createdAt}
          status={order.status}
          onUpdate={() => handleUpdateOrder()}
          onDelete={() => handleDeleteOrder(order._id)}
        />
      ))}
    </>
  );
};
