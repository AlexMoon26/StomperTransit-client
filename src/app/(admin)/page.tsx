import { Calc } from "@/features/Calc";
import { LatestCustomers } from "@/features/LatestCustomers";
import { Orders } from "@/widgets/Orders";
import { ButtonsAdminPage } from "@/features/ButtonsAdminPage";
import { getPendingOrders } from "@/api/orders";
import { DonutsList } from "@/components/charts/donutsList";

async function mainPage() {
  const orders = await getPendingOrders();
  return (
    <div>
      <div className="flex max-xl:flex-col max-xl:items-center justify-between  gap-4 mb-10">
        <DonutsList />

        <div className="flex max-xl:w-full w-1/2 justify-end">
          <LatestCustomers
            orders={[
              {
                customerName: "Вороненко Александр",
                email: "voronenko.alexander@mail.ru",
                price: "2 500",
                date: "16.10.23",
              },
              {
                customerName: "Вороненко Александр",
                email: "voronenko.alexander@mail.ru",
                price: "2 500",
                date: "16.10.23",
              },
              {
                customerName: "Вороненко Александр",
                email: "voronenko.alexander@mail.ru",
                price: "2 500",
                date: "16.10.23",
              },
            ]}
          />
        </div>
      </div>

      <div className="flex max-lg:flex-col max-md:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col gap-4 rounded w-1/2 max-lg:w-full ">
          <ButtonsAdminPage />
          <Orders orders={orders ? orders : []} />
        </div>
        <div className="p-10 w-1/2 bg-white rounded max-lg:w-full max-h-[556.5px] shadow">
          <Calc />
        </div>
      </div>
    </div>
  );
}

export default mainPage;
