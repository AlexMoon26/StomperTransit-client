"use server";
import { apiFetch } from "@/config/apiFetch";

export async function getClients() {
  const response = await apiFetch(`users`, {
    headers: { "Content-Type": "application/json" },
  });

  return response;
}
