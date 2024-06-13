import { getClientById } from "@/api/clients";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const client = getClientById(params.id);

  return {
    title: `Stomper Transit | ${(await client).firstName} ${
      (await client).surName
    }`,
    description: `Страница клиента ${(await client).firstName} ${
      (await client).surName
    } подсистемы Stomper Transit`,
  };
}

export default async function CurrentClientLayout({ children }) {
  return <div>{children} </div>;
}
