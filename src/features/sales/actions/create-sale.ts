"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { Sale } from "@/src/shared/types/sale";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function createSale(formData: FormData) {
  /*   const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await axiosRest.post<Sale>(API_ROOT.SALES.POST, formData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.data.id) {
    console.error("Error creating sale:", res.statusText);
  }
  revalidatePath("/dashboard/sales");
  redirect("/dashboard/sales"); */
  const data = {
    client: formData.get("client"),
    product: formData.get("product"),
  };
  console.log("Data: ", data);
}
