import React from "react";
import dynamic from "next/dynamic";
import { ChartLoader } from "../loaders/chartLoader";
import { getOrdersCount } from "@/api/orders";
import { Typography } from "@mui/material";
import { getFreeDrivers } from "@/api/drivers";

const DynamicOrdersChart = dynamic(
  () => import("@/components/charts/donuts/donutOrdersChart"),
  {
    ssr: false,
    loading: () => <ChartLoader />,
  }
);

const DynamicDriversChart = dynamic(
  () => import("@/components/charts/donuts/donutDriversChart"),
  {
    ssr: false,
    loading: () => <ChartLoader />,
  }
);
export async function DonutsList() {
  const orders = await getOrdersCount();
  const freeDrivers = await getFreeDrivers();

  return (
    <div className="flex max-lg:w-full w-1/2 gap-6 items-center justify-center">
      {orders && (orders.pending || orders.inProgress || orders.completed) ? (
        <DynamicOrdersChart
          pending={orders.pending}
          inProgress={orders.inProgress}
          completed={orders.completed}
          backgroundColor={"#222629"}
          name={"Заявки"}
        />
      ) : (
        <div className="flex max-lg:w-full w-1/2 gap-6 items-center justify-center">
          <Typography>Заявок нет</Typography>
        </div>
      )}
      {orders && (
        <DynamicDriversChart
          inProgress={orders.inProgress}
          free={freeDrivers.length}
          backgroundColor={"#222629"}
          name={"Водители"}
        />
      )}
    </div>
  );
}
