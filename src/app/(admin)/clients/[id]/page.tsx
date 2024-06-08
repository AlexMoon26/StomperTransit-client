import { getClientById, getClientOrdersById } from "@/api/clients";
import ClientProfile from "@/components/clients/clientProfile";

interface Context {
  searchParams: {
    take: number;
    skip: number;
  };
  params: {
    id: number;
  };
}

async function ClientPage(context: Context) {
  const { id } = context.params;
  const { take = 5, skip = 0 } = context.searchParams;

  const client = await getClientById(id);
  const orders = await getClientOrdersById(id, take, skip);
  return (
    <div>
      <ClientProfile client={client} orders={orders} />
    </div>
  );
}

export default ClientPage;
