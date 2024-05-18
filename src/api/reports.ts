"use server";
import { apiFetch } from "@/config/apiFetch";
import moment from "moment";

export async function ordersByDateRange(startDate, endDate) {
  const response = await apiFetch(
    `reports?startDate=${startDate || moment()}&endDate=${endDate || moment()}`,
    {
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
    }
  );

  return response;
}
