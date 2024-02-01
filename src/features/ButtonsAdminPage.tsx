"use client";
import React, { useState } from "react";
import ModalCreateApplication from "./Modals/ModalCreateApplication";
import LoadingButton from "@mui/lab/LoadingButton";
import dayjs from "dayjs";
import { Button } from "@mui/material";

export const ButtonsAdminPage = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateReport = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}reports/currentdate`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Создаем ссылку
      const a = document.createElement("a");
      a.href = url;
      a.download = `report-${dayjs(Date.now()).format("DD-MM-YYYY-H-mm")}.pdf`;

      // Добавляем ссылку в DOM
      document.body.appendChild(a);

      // Кликаем по ссылке для скачивания файла
      a.click();

      // Удаляем ссылку из DOM
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex gap-4">
        <Button
          className="items-center text-center rounded shadow w-full"
          onClick={handleOpen}
        >
          Создать заявку
        </Button>
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={generateReport}
          className="items-center text-centerrounded shadow w-full justify-center "
        >
          Сформировать отчет
        </LoadingButton>
      </div>
      {open ? (
        <ModalCreateApplication changeStateModal={handleClose} open={open} />
      ) : null}
    </>
  );
};
