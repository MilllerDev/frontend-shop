"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ENDPONTS } from "@/src/shared/api/endpoint";
import { Client } from "@/src/shared/types/client";

export async function getUsers(): Promise<Client[]> {
  const data = await axiosRest.get<Client[]>(API_ENDPONTS.CLIENTS.GET);
  console.log(data);
  return data.data;
}
