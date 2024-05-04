"use client";

import { Box, Modal, Typography } from "@mui/material";
import React, { createContext, useState, ReactNode, Context } from "react";

interface TargetModal<T> {
  component?: React.FC<T>;
  title: string;
  props?: T;
}
interface ModalContextProps {
  // eslint-disable-next-line
  targetModal: TargetModal<any> | null;
  // eslint-disable-next-line
  openModal: (modalData: TargetModal<any>) => void;
  closeModal: () => void;
}

export const boxModal = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60vw",
  bgcolor: "background.paper",
  boxShadow: 24,
};

const defaultContext: ModalContextProps = {
  targetModal: null,
  openModal: () => {},
  closeModal: () => {},
};

export const ModalContext: Context<ModalContextProps> =
  createContext(defaultContext);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // eslint-disable-next-line
  const [targetModal, setTargetModal] = useState<TargetModal<any> | null>(null);
  // eslint-disable-next-line
  const openModal = (modalData: TargetModal<any>) => {
    setTargetModal(modalData);
  };
  const closeModal = () => {
    setTargetModal(null);
  };

  const { component: Component, props, title } = targetModal || {};

  return (
    <ModalContext.Provider value={{ targetModal, openModal, closeModal }}>
      <Modal
        open={targetModal !== null}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={boxModal} className="rounded-lg box-modal max-h-[90vh]">
          <Box className="flex justify-between items-center p-5 border-b">
            <Typography fontSize={20} id="modal-modal-title">
              {title}
            </Typography>
            <button
              onClick={closeModal}
              className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
            >
              <span className="bg-transparent opacity-70 text-grey-800 text-2xl block outline-none focus:outline-none hover:text-gray-500">
                ×
              </span>
            </button>
          </Box>
          <Box
            id="modal-modal-description"
            className="max-h-[70vh] min-h-[40vh] overflow-y-scroll"
          >
            {Component && <Component {...props} />}
          </Box>
        </Box>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
