"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ENDPONTS } from "@/src/shared/api/endpoint";
import { Category, Product } from "@/src/shared/types/product";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function updateProduct(formData: FormData) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const id = formData.get("id") as string;
  const formToSend = new FormData();
  formToSend.append("title", formData.get("title") as string);
  formToSend.append("description", formData.get("description") as string);
  formToSend.append("price", formData.get("price") as string);
  formToSend.append("categoryId", formData.get("category") as string);
  formToSend.append("variants", formData.get("variants") as string);

  const image = formData.get("image") as File | null;
  if (image && image.size > 0 && image.type.startsWith("image/")) {
    formToSend.append("image", image);
  }
  console.log(formToSend);
  try {
    const res = await axiosRest.patch<Product>(
      API_ENDPONTS.PRODUCTS.BY_ID(id),
      formToSend,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!res.status) {
      console.error("Error al actualizar producto");
      return;
    }
  } catch (err: any) {
    console.error("Error al hacer la petición: ", err.response?.data || err);
  }
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}
