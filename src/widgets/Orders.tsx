import { OrderCard } from "@/features/OrderCard";
import { OrderStatus } from "@/types/types";
import React from "react";

export const Orders = () => {
  return (
    <>
      <OrderCard
        clientName={"Вороненко Александр"}
        id={"123"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={150}
        date={"2023-14-10:23:12"}
        status={OrderStatus.Pending}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        id={"1234"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={150}
        date={"2023-14-10"}
        status={OrderStatus.Pending}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        id={"12345"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={150}
        date={"2023-14-10"}
        status={OrderStatus.Pending}
      />
    </>
  );
};
