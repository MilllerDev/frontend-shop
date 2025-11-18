"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { InventaryStats } from "@/src/shared/types/dashboard";
import { cookies } from "next/headers";


export const getInvataryStats = async (): Promise<InventaryStats> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await axiosRest.get(`${API_ROOT.DASHBOARD.GET}/get-inventary-stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as InventaryStats;
}

