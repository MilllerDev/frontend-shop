import { Client } from "./client";

export interface Sale {
  id: string;
  total: string;
  status: string;
  saleDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  client: Client;
  details: DetailSale[];
}

export interface DetailSale {
  id: string;
  quantity: string;
  unitPrice: string;
  subtotal: string;
  variantProductId: string;
  productTitle: string;
  variantSizes: string;
  variantColor: string;
  productSku: string;
  createdAt: Date;
}
