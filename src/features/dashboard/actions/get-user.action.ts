"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { User } from "@/src/shared/types/user";
import { cookies } from "next/headers";

export async function getUser(): Promise<User> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const data = await axiosRest.get<User>(API_ROOT.AUTH.GET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
}