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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await getAllOrder({});
      } catch (error) {
        console.error("Произошла ошибка при получении заявок:", error);
      }
    };

    fetchUserData();
  }, [getAllOrder]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setAllOrders(data));
    }
    if (isError) {
      dispatch(removeLoading());
    }
  }, [isSuccess, data, dispatch, isError]);

  const orders = useAppSelector(selectOrders).orders;

  const isLoading = useAppSelector(selectOrders).isLoading;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
      {orders && orders.map(() => {})}
    </div>
  );
};

export default OrdersPage;
