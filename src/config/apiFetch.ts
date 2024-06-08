"use server";
import { cookies } from "next/headers";
export async function apiFetch(endpoint: string, options?: RequestInit) {
  try {
    const token = cookies().get("token");
    const url = `${process.env.NEXT_PUBLIC_APP_API_URL}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    };
    const response = await fetch(url, {
      ...options,
      headers: { ...headers, ...options?.headers },
    });

    if (response.status === 400) return { status: 400, data: response.json() }


    if (response) return response.json();
  } catch (err) {
    return false;
  }
}
