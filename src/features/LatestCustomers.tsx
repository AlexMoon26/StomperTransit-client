import { DeliveryStatus, OrderFull } from "@/types";
import moment from "moment";
import Link from "next/link";
import React from "react";
import "moment/locale/ru";
import { Box, Typography } from "@mui/material";

interface Props {
  orders: OrderFull[];
}

export const LatestCustomers = ({ orders }: Props) => {
  return (
    <>
      <div className="w-full p-4 bg-white border border-gray-200 rounded shadow sm:p-8 ">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-600">
            Выполненные заявки
          </h5>
          <Link
            href={`/orders`}
            className="text-sm font-medium text-green-500 hover:underline"
          >
            Посмотреть все
          </Link>
        </div>
        {orders && orders.length > 0 ? (
          <div className="flow-root">
            <ul role="list" className="divide-y divide-green-500">
              {orders.map((order, i) => (
                <li key={i} className="py-3 sm:py-4zz">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-600 truncate">
                        {order.client?.firstName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {order.client?.email}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {DeliveryStatus[order.typeOfCar]}{" "}
                      {order.bodySize && order.bodySize}
                    </p>
                    <div className="inline-flex items-center text-base font-semibold text-gray-400">
                      {moment(order.updatedAt).format("lll")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Box className="flex items-center justify-center w-full h-full">
            <Typography>Выполненных заявок нет</Typography>
          </Box>
        )}
      </div>
    </>
  );
};
