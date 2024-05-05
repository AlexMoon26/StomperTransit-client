"use sever";
import { apiFetch } from "@/config/apiFetch";
import { UserFull } from "@/types";

export async function updateAdmin(client: UserFull, id: string) {
  const response = await apiFetch(`users/${id}`, {
    method: "PUT",
    body: JSON.stringify(client),
  });
  return response;
}
