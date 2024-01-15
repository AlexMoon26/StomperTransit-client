import { OrderCard } from "@/features/OrderCard";
import React from "react";

export const Orders = () => {
  return (
    <>
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={150}
        date={"2023-14-10:23:12"}
        status={"В ожидании"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={150}
        date={"2023-14-10"}
        status={"В ожидании"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={150}
        date={"2023-14-10"}
        status={"В ожидании"}
      />
    </>
  );
};
