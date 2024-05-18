//@ts-nocheck
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DeliveryStatus, OrderStatus } from "@/types";
import moment from "moment";

const OrdersTable = React.forwardRef((props, ref) => {
  const { orders } = props;

  return (
    <TableContainer ref={ref}>
      <Table className="rounded-full">
        <TableHead className="bg-green-500 rounded ">
          <TableRow>
            <TableCell>Клиент</TableCell>
            <TableCell>Точка A</TableCell>
            <TableCell>Точка B</TableCell>
            <TableCell>Вес</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>Вид доставки</TableCell>
            <TableCell>Грузчики</TableCell>
            <TableCell>Водитель</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                {order.client.firstName} {order.client.surName}
              </TableCell>
              <TableCell>{order.pointA}</TableCell>
              <TableCell>{order.pointB}</TableCell>
              <TableCell>{order.weight}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex text-center items-center justify-center max-sm:w-1/3 ${
                    OrderStatus[order.status] === "В ожидании" &&
                    "text-purple-700"
                  } ${
                    OrderStatus[order.status] === "Выполняется" &&
                    "text-orange-700"
                  } ${
                    OrderStatus[order.status] === "Выполнена" &&
                    "text-green-700"
                  } text-md font-medium mr-2 px-2.5 py-0.5 rounded-full`}
                >
                  {OrderStatus[order.status]}
                </span>
              </TableCell>
              <TableCell>
                {DeliveryStatus[order.typeOfCar]} {order?.bodySize}
              </TableCell>
              <TableCell>{order.movers}</TableCell>
              <TableCell>
                {order?.driver?.firstName} {order?.driver?.surName}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default OrdersTable;
