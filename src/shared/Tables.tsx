"use client";
import { useState } from "react";
import { InputSearch } from "./inputs/InputSearch";
import { TableProps } from "@/types/types";

interface IProps {
  name: string;
  imgUser: string;
  countOrder: number;
  status: string;
  rating: number;
}

export const Tables = ({ data, clients, drivers }: TableProps) => {
  const [filterByName, setFilterByName] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState(false);
  const [filterByOrders, setFilterByOrders] = useState(false);
  const [filterByRating, setFilterByRating] = useState(false);

  const handleFilterByNameClick = () => {
    setFilterByName(!filterByName);
    // Сбрасываем другие фильтрации
    setFilterByStatus(false);
    setFilterByOrders(false);
    setFilterByRating(false);
  };

  const handleFilterByOrdersClick = () => {
    setFilterByOrders(!filterByOrders);
    // Сбрасываем другие фильтрации
    setFilterByName(false);
    setFilterByStatus(false);
    setFilterByRating(false);
  };

  const handleFilterByStatus = () => {
    setFilterByStatus(!filterByStatus);
    // Сбрасываем другие фильтрации
    setFilterByName(false);
    setFilterByOrders(false);
    setFilterByRating(false);
  };

  const handleFilterByRating = () => {
    setFilterByRating(!filterByRating);
    // Сбрасываем другие фильтрации
    setFilterByName(false);
    setFilterByOrders(false);
    setFilterByStatus(false);
  };

  const sortedData: IProps[] = [...data];

  const filteredData = filterByName
    ? sortedData.slice().sort((a, b) => a.name.localeCompare(b.name))
    : filterByOrders
    ? sortedData.slice().sort((a, b) => b.countOrder - a.countOrder)
    : filterByStatus
    ? sortedData.sort((a, b) => {
        if (a.status === "online" && b.status !== "online") {
          return -1; // Перемещаем онлайн выше офлайн
        } else if (a.status !== "online" && b.status === "online") {
          return 1; // Перемещаем офлайн ниже онлайн
        } else {
          return 0; // Остальные случаи сохраняют текущий порядок
        }
      })
    : filterByRating
    ? sortedData.slice().sort((a, b) => b.rating - a.rating)
    : sortedData;

  return (
    <div className="flex flex-col">
      <div className="relative flex w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:!bg-navy-800">
        <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700">
          <h4 className="text-lg font-bold text-navy-700">
            {clients && "Клиенты"}
            {drivers && "Водители"}
          </h4>
          <InputSearch />
        </div>

        <div className="w-full overflow-x-scroll px-4">
          <table
            role="table"
            className="w-full min-w-[700px] overflow-x-scroll"
          >
            <thead>
              <tr role="row">
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: "pointer" }}
                  className="min-w-[100px]"
                  onClick={handleFilterByNameClick}
                >
                  <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                    Имя
                    {filterByName ? " ▼" : " ▲"}
                  </div>
                </th>
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  style={{ cursor: "pointer" }}
                  className="min-w-[100px]"
                  onClick={handleFilterByOrdersClick}
                >
                  <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                    Заказов
                    {filterByOrders ? " ▼" : " ▲"}
                  </div>
                </th>
                {drivers && (
                  <th
                    colSpan={1}
                    role="columnheader"
                    title="Toggle SortBy"
                    className="min-w-[100px]"
                    style={{ cursor: "pointer" }}
                    onClick={handleFilterByRating}
                  >
                    <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                      Рейтинг
                      {filterByRating ? " ▼" : " ▲"}
                    </div>
                  </th>
                )}
                <th
                  colSpan={1}
                  role="columnheader"
                  title="Toggle SortBy"
                  className="min-w-[100px]"
                  style={{ cursor: "pointer" }}
                  onClick={handleFilterByStatus}
                >
                  <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                    Статус
                    {filterByStatus ? " ▼" : " ▲"}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="px-4">
              {filteredData.map((item, i) => (
                <tr role="row" key={i}>
                  <td className="py-3 text-sm" role="cell">
                    <div className="flex items-center gap-2">
                      <div className="h-[30px] w-[30px] rounded-full">
                        <img
                          src={item.imgUser}
                          className="h-full w-full rounded-full"
                          alt=""
                        />
                      </div>
                      <p className="text-sm font-medium text-navy-700">
                        {item.name}
                      </p>
                    </div>
                  </td>
                  <td className="py-3 text-sm" role="cell">
                    <p className="text-md font-medium text-gray-600">
                      {item.countOrder}
                    </p>
                  </td>
                  {drivers && (
                    <td className="py-3 text-sm" role="cell">
                      <div className="mx-2 flex font-bold">
                        <div className="h-2 w-16 rounded-full bg-gray-200">
                          <div
                            className="flex h-full items-center justify-center rounded-md bg-red-400"
                            style={{ width: `${item.rating}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="py-3 text-sm" role="cell">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center ${
                          item.status == "online"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }   text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full `}
                      >
                        <span
                          className={`w-2 h-2 mr-1 rounded-full ${
                            item.status == "online"
                              ? "bg-green-400"
                              : "bg-red-400"
                          }`}
                        ></span>
                        {item.status == "online" && "Онлайн"}
                        {item.status == "offline" && "Офлайн"}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
