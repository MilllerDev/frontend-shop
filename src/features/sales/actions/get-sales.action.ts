"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { Sale } from "@/src/shared/types/sale";
import { cookies } from "next/headers";

export async function getSales(): Promise<Sale[]> {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const res = await axiosRest.get<Sale[]>(API_ROOT.SALES.GET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as Sale[];
}
