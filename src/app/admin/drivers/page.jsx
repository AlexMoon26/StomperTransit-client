import React from "react";
import { Tables } from "@/shared/Tables";

const DriversPage = () => {
  return (
    <>
      <Tables
        data={[
          {
            name: "Вороненко Александр",
            imgUser: "/images/profile.png",
            countOrder: "12",
            rating: 50,
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/profile.png",
            countOrder: "1",
            rating: 75,
            status: "online",
          },
          {
            name: "Вороненко Александр",
            imgUser: "/images/profile.png",
            countOrder: "24",
            rating: 50,
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/profile.png",
            countOrder: "3",
            rating: 50,
            status: "online",
          },
          {
            name: "Вороненко Александр",
            imgUser: "/images/profile.png",
            countOrder: "6",
            rating: 90,
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/profile.png",
            countOrder: "2",
            rating: 50,
            status: "offline",
          },
          {
            name: "Вороненко Александр",
            imgUser: "/images/profile.png",
            countOrder: "0",
            rating: 50,
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/profile.png",
            countOrder: "0",
            rating: 100,
            status: "online",
          },
        ]}
        drivers
      />
    </>
  );
};

export default DriversPage;
