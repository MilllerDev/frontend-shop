"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { Client } from "@/src/shared/types/client";
import { cookies } from "next/headers";

export async function getClients(): Promise<Client[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await axiosRest.get(API_ROOT.CLIENTS.GET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as Client[];
}
