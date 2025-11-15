"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { Category, Product } from "@/src/shared/types/product";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createProduct(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const formToSend = new FormData();
  formToSend.append("title", formData.get("title") as string);
  formToSend.append("price", formData.get("price") as string);
  formToSend.append("categoryId", formData.get("category") as string);
  formToSend.append("variants", formData.get("variants") as string);

  const image = formData.get("image");
  if (image && typeof image === "object") {
    const blob = image as Blob;
    formToSend.append("image", blob);
  }
  console.log(formToSend);
  try {
    const res = await axiosRest.post<Product>(
      API_ROOT.PRODUCTS.CREATE,
      formToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (!res.data.id) {
      console.error("Error al crear producto");
      return;
    }

    revalidatePath("/dashboard");
    return { ok: true };
  } catch (err: any) {
    console.error("Error al hacer la petición: ", err.response?.data || err);
    return { ok: false };
  }
}

export async function getCategories(): Promise<Category[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await axiosRest.get(API_ROOT.CATEGORIES.GET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as Category[];
}
