import { ChartLoader } from "@/components/loaders/chartLoader";
import OrdersListLoader from "@/components/loaders/ordersListLoader";
import { ButtonsAdminPage } from "@/features/ButtonsAdminPage";
import { LatestCustomers } from "@/features/LatestCustomers";
import { Box, Button, Skeleton } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Box>
      <Box className="flex max-xl:flex-col max-xl:items-center justify-between  gap-4 mb-10">
        <Box className="flex max-lg:w-full w-1/2 gap-6 items-center justify-center">
          {Array.from(new Array(2)).map((_, i) => (
            <ChartLoader key={i} />
          ))}
        </Box>

        <Box className="flex max-xl:w-full w-1/2 justify-end">
          <LatestCustomers orders={[]} />
        </Box>
      </Box>

      <Box className="flex max-lg:flex-col max-md:items-center justify-between gap-4 mb-4">
        <Box className="flex flex-col gap-4 rounded w-1/2 max-lg:w-full ">
          <Box className="flex justify-between gap-5">
            <Button disabled fullWidth>
              Создать заявку
            </Button>
            <Button disabled fullWidth>
              Сформировать отчет
            </Button>
          </Box>
          {Array.from(new Array(3)).map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              className="w-full"
              height={244}
            />
          ))}
        </Box>

        <Skeleton variant="rounded" height={600} className="w-1/2 h-full " />
      </Box>
    </Box>
  );
}
