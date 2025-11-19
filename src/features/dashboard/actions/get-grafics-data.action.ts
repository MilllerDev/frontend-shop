"use server"

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { CategoriByProductGraficDonaut, GraficsEstadisticByMonth } from "@/src/shared/types/grafics-estadistics";
import { cookies } from "next/headers";

export const getGraficsByMonth = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const res = await axiosRest.get<GraficsEstadisticByMonth>(`${API_ROOT.SALES.GET}/statistics/mes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as GraficsEstadisticByMonth;
}


export const getGraficsByCategoriesWithCountProduct = async () => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  const res = await axiosRest.get<CategoriByProductGraficDonaut>(`${API_ROOT.CATEGORIES.GET}/statistics/percentages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as CategoriByProductGraficDonaut;
}
