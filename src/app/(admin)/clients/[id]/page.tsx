import { getClientById, getClientOrdersById } from "@/api/clients";
import ClientProfile from "@/components/clients/clientProfile";

import React from "react";

export default async function page({ params }: { params: { id: number } }) {
  const client = await getClientById(params.id);
  const orders = await getClientOrdersById(params.id);

  return <ClientProfile client={client} orders={orders} />;
}
