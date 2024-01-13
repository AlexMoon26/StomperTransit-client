"use client";
import Image from "next/image";
import React, { useState } from "react";
import ModalEditOrder from "./Modals/ModalEditOrder";
import ModalTransitOrder from "./Modals/ModalTransitOrder";
import { ApplicationProps } from "@/types/types";
import dayjs from "dayjs";

export const OrderCard = ({
  clientName,
  pointA,
  pointB,
  date,
  weight,
  status,
  driverName,
  driverStatus,
}: ApplicationProps) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openTransit, setOpenTransit] = useState(false);

  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenTransit = () => setOpenTransit(true);
  const handleCloseTransit = () => setOpenTransit(false);

  return (
    <>
      <div
        className={`flex w-full text-xs md:text-sm xxl:text-lg border-l-[8px] rounded-l shadow  ${
          status === "В ожидании"
            ? "border-l-red-400"
            : status === "Выполняется"
            ? "border-l-green-500"
            : "border-l-gray-400"
        }  p-5 rounded bg-white`}
        role="list"
      >
        <ul className="w-full space-y-5 items-center justify-center">
          <li className="flex space-x-3 items-center">
            <span className=" font-normal truncate dark:text-gray-400">
              {clientName}
            </span>
          </li>
          <li className="flex space-x-3 items-center">
            <span className="font-normal leading-tight  dark:text-gray-400">
              {pointA} — {pointB}
            </span>
          </li>
          <li className="flex space-x-3 items-center">
            <span className="font-normal leading-tight  dark:text-gray-400"></span>
          </li>
          <li className="flex space-x-3 items-center">
            {status === "В ожидании" ? (
              <span className="font-normal leading-tight hover:cursor-pointer dark:text-green-400">
                Выбрать водителя
              </span>
            ) : status === "Выполняется" ? (
              <>
                <span className="font-normal leading-tight  dark:text-green-400">
                  Водитель - {driverName}
                </span>
                <span className="font-normal leading-tight text-red-400 ">
                  {driverStatus}
                </span>
              </>
            ) : (
              <span className="font-normal leading-tight  dark:text-gray-400">
                Водитель - {driverName}
              </span>
            )}
          </li>
        </ul>

        <div className="flex flex-col justify-between w-1/6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 justify-end">
              <h5 className="font-normal text-gray-500 dark:text-gray-400">
                {dayjs(date).format("DD.MM.YY HH:mm")}
              </h5>
              <Image
                src="/images/icons/clock.svg"
                width={20}
                height={20}
                alt="Время"
              />
            </div>
            <div className="flex justify-end">
              <span className="font-normal leading-tight text-gray-500 dark:text-gray-400">
                {weight} кг
              </span>
            </div>
          </div>

          {status === "Выполняется" ? (
            <div className="flex gap-4 justify-end">
              <button onClick={handleOpenTransit}>
                <Image
                  className="hover:cursor-pointer"
                  src="/images/icons/transit.svg"
                  width={20}
                  height={20}
                  alt="Перенос-заявки"
                />
              </button>
            </div>
          ) : null}
          {status === "В ожидании" ? (
            <div className="flex gap-4 justify-end">
              <button type="button" onClick={handleOpenEdit}>
                <Image
                  className="hover:cursor-pointer"
                  src="/images/icons/edit.svg"
                  width={20}
                  height={20}
                  alt="Изменение-заявки"
                />
              </button>
            </div>
          ) : null}
        </div>
      </div>
      {openEdit && (
        <ModalEditOrder
          changeStateModal={handleCloseEdit}
          open={openEdit}
          clientName={clientName}
          status={status}
          pointA={pointA}
          pointB={pointB}
          weight={weight}
        />
      )}
      {openTransit && (
        <ModalTransitOrder
          changeStateModal={handleCloseTransit}
          openTransit={openTransit}
          clientName={clientName}
          status={status}
          date={date}
        />
      )}
    </>
  );
};
