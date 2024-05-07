import React from "react";
import dynamic from "next/dynamic";
import { ChartLoader } from "./chartLoader";
import { getOrdersCount } from "@/api/orders";

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

  return (
    <div className="flex max-lg:w-full w-1/2 gap-6 items-center justify-center">
      {orders && (
        <DynamicOrdersChart
          pending={orders.pending}
          inProgress={orders.inProgress}
          completed={orders.completed}
          backgroundColor={"#222629"}
          name={"Заявки"}
        />
      )}
      <DynamicDriversChart
        inProgress={3}
        free={3}
        backgroundColor={"#222629"}
        name={"Водители"}
      />
    </div>
  );
}
