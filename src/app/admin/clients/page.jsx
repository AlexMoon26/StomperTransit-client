import { Tables } from "@/shared/Tables";
import React from "react";

const ClientsPage = () => {
  return (
    <>
      <Tables
        data={[
          {
            name: "Вороненко Александр",
            imgUser: "/images/Profile.png",
            countOrder: "12",
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/Profile.png",
            countOrder: "1",
            status: "online",
          },
          {
            name: "Вороненко Александр",
            imgUser: "/images/Profile.png",
            countOrder: "24",
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/Profile.png",
            countOrder: "3",
            status: "online",
          },
          {
            name: "Вороненко Александр",
            imgUser: "/images/Profile.png",
            countOrder: "6",
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/Profile.png",
            countOrder: "2",
            status: "offline",
          },
          {
            name: "Вороненко Александр",
            imgUser: "/images/Profile.png",
            countOrder: "0",
            status: "offline",
          },
          {
            name: "Смирнов Иван",
            imgUser: "/images/Profile.png",
            countOrder: "0",
            status: "online",
          },
        ]}
        clients
      />
    </>
  );
};

export default ClientsPage;
