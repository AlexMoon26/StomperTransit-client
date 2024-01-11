import { OrderCard } from "@/features/OrderCard";
import React from "react";

const OrdersPage = () => {
  return (
    <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"pending"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"active"}
        driverName={"Смирнов Максим"}
        driverStatus={"Ожидает в Точке А"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"completed"}
        driverName={"Давыдов Сергей"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"pending"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"completed"}
        driverName={"Давыдов Сергей"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"completed"}
        driverName={"Давыдов Сергей"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"completed"}
        driverName={"Давыдов Сергей"}
      />
      <OrderCard
        clientName={"Вороненко Александр"}
        pointA={"г.Краснодар, ул.Московская, 82"}
        pointB={"г.Краснодар, ул.Северная, 12"}
        weight={"150"}
        date={"2023-14-10:23:12"}
        status={"active"}
        driverName={"Давыдов Сергей"}
        driverStatus={"В пути к Точка B"}
      />
    </div>
  );
};

export default OrdersPage;
