"use client";
import InputMaskPhone from "@/shared/inputs/InputMaskPhone";
import { boxModal } from "@/theme/classes";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

const ModalCreateApplication = ({ changeStateModal, open }) => {
  return (
    <Modal
      open={open}
      onClose={changeStateModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={boxModal} className="rounded-lg">
        <Box
          id="modal-modal-title"
          className="flex justify-between items-center p-5 border-b"
        >
          <Typography fontSize={20}>Создание заявки</Typography>
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
        <div className="relative p-6 flex-auto">
          <div className="flex flex-col gap-5">
            <InputMaskPhone label="Номер телефона" />
            <TextField label="Фамилия и имя" />
            <TextField label="Точка А" />
            <TextField label="Точка B" />
            <TextField label="Вес" />
          </div>
        </div>
        {/*footer*/}
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <Button variant="contained">Создать</Button>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCreateApplication;
