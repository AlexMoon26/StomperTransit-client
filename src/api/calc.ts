import { apiFetch } from "@/config/apiFetch";
import { Calc } from "@/types";

export async function calcelatePrice(calc: Calc) {
  const response = await apiFetch(`calc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(calc),
  });

  return response;
}
