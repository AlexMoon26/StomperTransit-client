"use client";
import { SmallOrderCard } from "@/components/orders/smallOrderCard";
import { OrderFull } from "@/types";
import { Box, Button } from "@mui/material";
import { useState } from "react";

interface Props {
  orders: OrderFull[];
}

export const Orders = ({ orders }: Props) => {
  const [showFullList, setShowFullList] = useState(false);

  return (
    <>
      {orders?.length < 1 && (
        <Box className="flex bg-white shadow rounded justify-center h-full items-center min-h-[200px]">
          Нет заявок в ожидании
        </Box>
      )}

      {orders && orders.length > 0 && (
        <>
          {orders.length > 3 && (
            <Button onClick={() => setShowFullList(!showFullList)}>
              {!showFullList
                ? "Показать все заявки"
                : "Показать три первые заявки"}{" "}
              ({orders.length - 3})
            </Button>
          )}
          {!showFullList &&
            orders
              .slice(0, 3)
              .map((order, i) => <SmallOrderCard key={i} order={order} />)}

          {showFullList &&
            orders.map((order, i) => <SmallOrderCard key={i} order={order} />)}
        </>
      )}
    </>
  );
};
