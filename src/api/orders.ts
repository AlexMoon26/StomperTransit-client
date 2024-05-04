"use server";
import { apiFetch } from "@/config/apiFetch";
import { Order, OrderFull } from "@/types";
import { revalidateTag } from "next/cache";

export async function getOrders() {
  const response = await apiFetch(`orders`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function getPendingOrders() {
  const response = await apiFetch(`orders?status=pending`, {
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
  });
  return response;
}

export async function createOrder(order: Order) {
  const response = await apiFetch(`orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  revalidateTag("/");
  return response;
}

export async function editOrder(order: OrderFull, id: string) {
  const response = await apiFetch(`orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  revalidateTag("orders");
  return response;
}

export async function deleteOrder(id: string) {
  const response = await apiFetch(`orders/${id}`, {
    method: "delete",
    headers: { "Content-Type": "application/json" },
  });

  revalidateTag("orders");
  return response;
}
