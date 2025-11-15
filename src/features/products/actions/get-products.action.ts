"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ROOT } from "@/src/shared/api/endpoint";
import { Product } from "@/src/shared/types/product";
import { cookies } from "next/headers";

export async function getAllProducts(): Promise<Product[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await axiosRest.get(API_ROOT.PRODUCTS.GET, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as Product[];
}

export async function getProductById(id: string): Promise<Product> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const res = await axiosRest.get(API_ROOT.PRODUCTS.BY_ID(id), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data as Product;
}
