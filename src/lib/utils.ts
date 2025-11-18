import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "../features/sales/store/sale.store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(fecha: string): string {
  const convert = new Date(fecha);
  const dia = String(convert.getUTCDate()).padStart(2, "0");
  const mes = String(convert.getUTCMonth() + 1).padStart(2, "0");
  const anio = convert.getUTCFullYear();

  return `${dia}-${mes}-${anio}`;
}

export function salePayload(items: CartItem[]) {
  return {
    details: items.map((item) => ({
      quantity: item.quantity,
      unitPrice: item.product.price,
      variantProductId: item.variant.id,
    })),
  };
}
