"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { Sale } from "@/src/shared/types/sale";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createSale(formData: FormData): Promise<{ ok: boolean }> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await axiosRest.post<Sale>(API_ROOT.SALES.POST, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.data.id) {
    console.error("Error creating sale:", res.statusText);
    return { ok: false };
  }
  revalidatePath("/dashboard/sales");
  return { ok: true };
}
