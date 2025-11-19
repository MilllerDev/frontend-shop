"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSale(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const rawPayload = formData.get("payload") as string;

  const data = {
    clientId: formData.get("client") as string,
    status: formData.get("status") as string,
    ...JSON.parse(rawPayload),
  };

  const res = await axiosRest.post(API_ROOT.SALES.POST, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  console.log(res.data);
  if (!res.data.sale.id) {
    return;
  }

  revalidatePath("/dashboard/sales");
  redirect("/dashboard/sales");
}
