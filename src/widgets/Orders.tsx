import { OrderCard } from "@/components/orders/orderCard";
import { OrderFull } from "@/types";
import { Box } from "@mui/material";

interface Props {
  orders: OrderFull[];
}

export const Orders = ({ orders }: Props) => {
  return (
    <>
      {orders?.length < 1 && (
        <Box className="flex bg-white justify-center h-full items-center min-h-[200px]">
          Нет заявок в ожидании
        </Box>
      )}
      {orders && orders?.map((order, i) => <OrderCard key={i} order={order} />)}
    </>
  );
};
