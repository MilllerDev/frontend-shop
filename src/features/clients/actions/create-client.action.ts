"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { Client } from "@/src/shared/types/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type InputClient = {
  name: string;
  lastname: string;
  phone: string;
  direction?: string;
};

export async function createClient(inputs: InputClient) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  try {
    const res = await axiosRest.post<Client>(API_ROOT.CLIENTS.CREATE, inputs, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.data.id) {
      console.error("Error al crear el cliente");
      return;
    }
    revalidatePath("/dashboard/clients");

    return res.data;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
