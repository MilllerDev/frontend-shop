"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ENDPONTS } from "@/src/shared/api/endpoint";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const credentials = {
    email: formData.get("mail") as string,
    password: formData.get("pass") as string,
  };

  try {
    const res = await axiosRest.post(API_ENDPONTS.AUTH.LOGIN, credentials);
    console.log("login exitoso: ", res.data.token);
    if (res.data.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", res.data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60,
        path: "/",
      });
    }
  } catch {
    redirect("/auth/login?error=true");
  }

  redirect("/dashboard");
}
