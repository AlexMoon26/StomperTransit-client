"use client";
import React, { useState } from "react";
import ModalCreateApplication from "./Modals/ModalCreateApplication";
import { Button } from "@mui/material";

export const ButtonsAdminPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTNmZDk1NWNhNzYxZWUxYzU0ZjUxOSIsImlhdCI6MTcwNjY4MDMzNn0.WHom9EaMJCy9Tm9bnYc3g8utLoDQaZlGq5ctFj_iVjM";

  const generateReport = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}reports/currentdate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Создаем ссылку
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.pdf";

      // Добавляем ссылку в DOM
      document.body.appendChild(a);

      // Кликаем по ссылке для скачивания файла
      a.click();

      // Удаляем ссылку из DOM
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
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
        <Button
          onClick={generateReport}
          className="items-center text-centerrounded shadow w-full justify-center "
        >
          Сформировать отчет
        </Button>
      </div>
      {open ? (
        <ModalCreateApplication changeStateModal={handleClose} open={open} />
      ) : null}
    </>
  );
};
