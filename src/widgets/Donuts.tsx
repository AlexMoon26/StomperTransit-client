import React from "react";
import DonutChart from "@/features/charts/DonutChart";

export const Donuts = () => {
  return (
    <div className="flex max-lg:w-full w-1/2 gap-6 items-center justify-center">
      <DonutChart
        filled={3}
        allData={4}
        backgroundColor={"#86C232"}
        name={"Заявок"}
      />
      <DonutChart
        filled={2}
        allData={3}
        backgroundColor={"#222629"}
        name={"Водителей"}
      />
    </div>
  );
};
