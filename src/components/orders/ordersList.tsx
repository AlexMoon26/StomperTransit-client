"use client";
import { OrderCard } from "@/components/orders/orderCard";
import { OrderFull, OrderStatus } from "@/types";
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useScreenWidth } from "@/hooks/useScreenWidth";

interface Props {
  orders: OrderFull[];
}

const filterOptions = [
  { value: "all", label: "Все" },
  { value: "Pending", label: "Только в ожидании" },
  { value: "InProgress", label: "Только выполняющиеся" },
  { value: "Completed", label: "Только выполненные" },
];

export default function OrdersList({ orders }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("all");

  const { isDesktop } = useScreenWidth();

  const filteredOrders = orders
    ? orders
        .filter((item) => {
          const searchTextLower = searchTerm.toLowerCase();
          return (
            item.client?.firstName.toLowerCase().includes(searchTextLower) ||
            item.client?.surName?.toLowerCase().includes(searchTextLower)
          );
        })
        .filter((item) => {
          switch (filterOption) {
            case "all":
              return true;
            case "Pending":
              return OrderStatus[item.status] === "В ожидании";
            case "InProgress":
              return OrderStatus[item.status] === "Выполняется";
            case "Completed":
              return OrderStatus[item.status] === "Выполнена";
            default:
              return true;
          }
        })
    : [];
  return (
    <>
      <Box display="flex" flexDirection="column" className="gap-4">
        <Box className="flex mb-4 gap-5 md:justify-between">
          <Select
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            label="Сортировать по"
          >
            {filterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <TextField
            sx={isDesktop ? { width: "50%" } : {}}
            fullWidth={!isDesktop}
            label="Поиск"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      {orders && filteredOrders?.length > 0 ? (
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
          {orders
            ? filteredOrders?.map((order, i) => (
                <OrderCard key={order._id || i} order={order} />
              ))
            : "Заявок нет"}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          height="85vh"
          width="100%"
        >
          <Typography fontSize={20}>Таких заявок нет</Typography>
        </Box>
      )}
    </>
  );
}
