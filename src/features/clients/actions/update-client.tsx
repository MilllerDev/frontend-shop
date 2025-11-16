"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateClient(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const id = formData.get("id") as string;
  const data = {
    name: formData.get("name") as string,
    lastname: formData.get("lastname") as string,
    phone: formData.get("phone") as string,
    direccion: formData.get("direccion") as string,
  };
  const res = await axiosRest.patch(API_ROOT.CLIENTS.BY_ID(id), data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.data.id) {
    console.error("Error al acutalizar");
    return { ok: false };
  }

  revalidatePath("/dashboard/clients");
  return { ok: true };
}
