"use server";
import { apiFetch } from "@/config/apiFetch";
import { User, UserFull } from "@/types";
import { revalidatePath } from "next/cache";

export async function getClients() {
  const response = await apiFetch(`users`, {
    headers: { "Content-Type": "application/json" },
  });

  return response;
}

export async function getClientById(id: number | string): Promise<UserFull> {
  const response = await apiFetch(`users/${id}`, {
    headers: { "Content-Type": "application/json" },
  });

  return response;
}

export async function getClientOrdersById(
  id: number,
  take: number = 5,
  skip: number = 0
) {
  const response = await apiFetch(
    `users/${id}/orders?take=${take}&skip=${skip}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
}

export async function createClient(client: User) {
  const response = await apiFetch(`users`, {
    method: "POST",
    body: JSON.stringify(client),
  });
  revalidatePath("/clients");

  return response;
}

export async function updateClient(client: User, id: string) {
  const response = await apiFetch(`users/${id}`, {
    method: "PUT",
    body: JSON.stringify(client),
  });
  revalidatePath("/clients");

  return response;
}
