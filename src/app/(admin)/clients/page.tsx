import { getClients } from "@/api/clients";
import ClientsList from "@/components/clients/clientsList";

import React from "react";

async function ClientsPage() {
  const clients = await getClients();
  return <ClientsList clients={clients ? clients : []} />;
}

export default ClientsPage;
