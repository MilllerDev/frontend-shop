"use server"

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { cookies } from "next/headers";

interface Inputs {
  start?: string;
  end?: string;
}

export const generateReport = async (inputs: Inputs) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "arraybuffer" as const, // 👈 necesario para PDF
  };
  const res =
    !inputs.start && !inputs.end
      ? await axiosRest.get(`${API_ROOT.REPORTS.GET}/sales`, config)
      : await axiosRest.post(`${API_ROOT.REPORTS.POST}/sales`, inputs, {
        ...config,
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
      });

  const base64 = Buffer.from(res.data).toString("base64");

  return {
    file: base64,
    contentType: "application/pdf",
    fileName: "reporte.pdf",
  };
};
