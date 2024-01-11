"use client";
import React, { useState } from "react";
import ModalCreateApplication from "./Modals/ModalCreateApplication";
import { Button } from "@mui/material";

export const ButtonsAdminPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className="flex gap-4">
        <Button
          className="items-center text-center rounded shadow w-full"
          onClick={handleOpen}
        >
          Создать заявку
        </Button>
        <Button className="items-center text-centerrounded shadow w-full justify-center ">
          Сформировать отчет
        </Button>
      </div>
      {open ? (
        <ModalCreateApplication changeStateModal={handleClose} open={open} />
      ) : null}
    </>
  );
};
