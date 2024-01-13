"use client";
import { OrderCard } from "@/features/OrderCard";
import React, { useEffect } from "react";

import { useGetAllOrdersMutation } from "@/GlobalRedux/ordersApi";
import { useAppDispatch, useAppSelector } from "@/GlobalRedux/hooks";
import {
  removeLoading,
  selectOrders,
  setAllOrders,
} from "@/GlobalRedux/Features/orderSlice";
import { Loader } from "@/shared/Loader";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const [getAllOrder, { data, isSuccess, isError }] = useGetAllOrdersMutation();

  const fetchData = async () => {
    try {
      await getAllOrder({});
    } catch (error) {
      console.error("Произошла ошибка при получении заявок:", error);
    }
  };

  const handleSuccess = () => {
    if (isSuccess && data) {
      console.log(data);
      dispatch(setAllOrders(data));
    }
  };

  const handleError = () => {
    if (isError) {
      dispatch(removeLoading());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleSuccess();
    handleError();
  }, [isSuccess, data, isError]);

  const { orders, isLoading } = useAppSelector(selectOrders);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
      {orders?.map((order, i) => (
        <OrderCard
          clientName={order.client.firstName}
          pointA={order.pointA}
          pointB={order.pointB}
          date={order.createdAt}
          weight={order.weight!}
          status={order.status}
          key={i}
          driverName={`${order.driver?.firstName || ""} ${
            order.driver?.surName || ""
          }`}
        />
      ))}
    </div>
  );
};

export default OrdersPage;
