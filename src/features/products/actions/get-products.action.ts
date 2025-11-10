"use server";

import axiosRest from "@/src/shared/api/axios-rest";
import { API_ENDPONTS } from "@/src/shared/api/endpoint";
import { Product } from "@/src/shared/types/product";

export async function getAllProducts(query?: string): Promise<Product[]> {
  const res = await axiosRest.get(API_ENDPONTS.PRODUCTS.GET);
  return res.data as Product[];
}
