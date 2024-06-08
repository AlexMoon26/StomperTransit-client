"use server";
import { apiFetch } from "@/config/apiFetch";
import { User } from "@/types";
import { revalidatePath } from "next/cache";

export async function getDrivers() {
  const response = await apiFetch(`drivers`, {
    headers: { "Content-Type": "application/json" },
  });

  return response;
}

export async function getFreeDrivers() {
  const response = await apiFetch(`drivers/free`, {
    headers: { "Content-Type": "application/json" },
  });

  return response;
}

export async function updateDriver(drivers: User, id: string) {
  const response = await apiFetch(`drivers/${id}`, {
    method: "PUT",
    body: JSON.stringify(drivers),
  });

  revalidatePath("/drivers");

  return response;
}

export async function createDriver(driver: User) {
  const response = await apiFetch(`drivers`, {
    method: "POST",
    body: JSON.stringify(driver),
  });
  revalidatePath("/drivers");

  return response;
}
