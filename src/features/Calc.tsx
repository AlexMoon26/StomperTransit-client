"use client";
import { Button, TextField } from "@mui/material";
import React from "react";

export const Calc = () => {
  return (
    <>
      <form>
        <div className="grid gap-6 mb-6">
          <TextField
            label="Точка А"
            placeholder="г.Краснодар, ул.Северная 42, кв 213"
          />
          <TextField
            label="Точка B"
            placeholder="г.Краснодар, ул.Карасунская 100/2, кв 2"
          />
          <TextField label="Вес" placeholder="200" />
        </div>

        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-400"
          >
            Есть необходимость в{" "}
            <span className="text-green-500 hover:underlin">грузчиках</span>
          </label>
        </div>
      </form>

      <div className="my-10">
        <div className="flex justify-between">
          <label className="block mb-2 text-sm font-medium text-gray-400">
            Расстояние между точками:
          </label>
          <label className="block mb-2 text-sm font-medium text-green-500">
            25 км
          </label>
        </div>
        <div className="flex justify-between">
          <label className="block mb-2 text-sm font-medium text-gray-400">
            Стоимость:
          </label>
          <label className="block mb-2 text-sm font-medium text-red-400">
            4560 Р
          </label>
        </div>
      </div>
      <div className="text-center">
        <Button className="text-green-500">Отправить</Button>
      </div>
    </>
  );
};
