"use client";
import React, { useContext } from "react";
import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { ModalContext } from "@/components/modalContext";
import { CreateOrderForm } from "@/components/orders/modalForms/createOrderForm";
import { OrdersByDateRangeForm } from "@/components/reports/modalForms/ordersByDateRangeForm";

export const ButtonsAdminPage = () => {
  const { openModal, closeModal } = useContext(ModalContext);

  const handleCreateOrder = () => {
    openModal({
      component: CreateOrderForm,
      props: { closeModal },
      title: "Создание новой заявки",
    });
  };

  const generateReport = async () => {
    openModal({
      component: OrdersByDateRangeForm,
      props: { closeModal },
      title: "Создание отчета",
    });
  };
  return (
    <>
      <div className="flex gap-4">
        <Button
          className="items-center text-center rounded shadow w-full"
          onClick={handleCreateOrder}
        >
          Создать заявку
        </Button>
        <LoadingButton
          variant="contained"
          onClick={generateReport}
          className="items-center text-centerrounded shadow w-full justify-center "
        >
          Сформировать отчет
        </LoadingButton>
      </div>
    </>
  );
};
