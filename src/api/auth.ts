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

    const { token, user } = await response;

    if (!!token && !!user) {
      cookies().set("token", token, {
        expires: Date.now() + 21 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      cookies().set("role", user.role, {
        expires: Date.now() + 21 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    } else {
      return false;
    }
    return response;
  } catch (err) {
    return { ok: false, message: err };
  }
}

export async function register(data: AuthFormSignIn) {
  try {
    const response = await apiFetch("auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const { token, user } = await response;

    if (!!token && user) {
      cookies().set("token", token, {
        expires: Date.now() + 21 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      cookies().set("role", user.role, {
        expires: Date.now() + 21 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
    }
    return response;
  } catch (err) {
    return { ok: false, message: err };
  }
}

export async function authLogout() {
  await cookies().delete("token");
  await cookies().delete("role");
  return { message: "Успешный выход" };
}

export async function profile() {
  try {
    const response = await apiFetch("auth/me");

    return { ok: true, ...response.user };
  } catch (err) {
    return { ok: false, message: err };
  }
}
