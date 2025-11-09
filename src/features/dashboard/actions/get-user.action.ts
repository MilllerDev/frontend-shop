"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { Client } from "@/src/shared/types/client";

export async function getUsers(): Promise<Client[]> {
  const data = await axiosRest.get<Client[]>("/clients");
  return data.data;
}
