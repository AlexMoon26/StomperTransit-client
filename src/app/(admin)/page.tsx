import { Calculator } from "@/components/calculator";
import { LatestCustomers } from "@/features/LatestCustomers";
import { Orders } from "@/widgets/Orders";
import { ButtonsAdminPage } from "@/features/ButtonsAdminPage";
import { getOrders, getPendingOrders } from "@/api/orders";
import { DonutsList } from "@/components/charts/donutsList";

async function mainPage() {
  const orders = await getPendingOrders();
  const lastCompletedOrders = await getOrders("completed", 3);
  return (
    <div>
      <div className="flex max-xl:flex-col max-xl:items-center justify-between  gap-4 mb-10">
        <DonutsList />

        <div className="flex max-xl:w-full w-1/2 justify-end">
          <LatestCustomers
            orders={lastCompletedOrders ? lastCompletedOrders : []}
          />
        </div>
      </div>

      <div className="flex max-lg:flex-col max-md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col gap-4 rounded w-1/2 max-lg:w-full ">
          <ButtonsAdminPage />
          <Orders orders={orders ? orders : []} />
        </div>

        <Calculator />
      </div>
    </div>
  );
}

export default mainPage;
