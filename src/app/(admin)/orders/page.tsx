import { getOrders } from "@/api/orders";
import OrdersList from "@/components/orders/ordersList";
import { OrderFull } from "@/types";

async function OrdersPage() {
  const orders: OrderFull[] = await getOrders();

  return <OrdersList orders={orders} />;
}

export default OrdersPage;
