"use server";
import { apiFetch } from "@/config/apiFetch";
import { AuthFormSignIn } from "@/types";
import { cookies } from "next/headers";

export async function login(data: AuthFormSignIn) {
  try {
    const response = await apiFetch("auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const { token } = response;

    if (!!token) {
      cookies().set("token", token, {
        expires: Date.now() + 21 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }
    return response;
  } catch (err) {
    return { ok: false, message: err };
  }
}

export async function profile() {
  try {
    const response = await apiFetch("auth/me");
    return response.user;
  } catch (err) {
    return { ok: false, message: err };
  }
}
