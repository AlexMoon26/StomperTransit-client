import { getDrivers } from "@/api/drivers";
import { DriversList } from "@/components/drivers/driversList";
import React from "react";

async function DriversPage() {
  const drivers = await getDrivers();
  return <DriversList drivers={drivers ? drivers : []} />;
}

export default DriversPage;
