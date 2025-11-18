import { Product } from "@/src/shared/types/product";
import { VariantProduct } from "@/src/shared/types/variant";
import { create } from "zustand";

export interface CartItem {
  product: Product;
  quantity: number;
  variant: VariantProduct;
}

interface SaleStore {
  items: CartItem[];
  addItem: (
    product: Product,
    variant: VariantProduct,
    quantity: number
  ) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useSaleStore = create<SaleStore>((set) => ({
  items: [],

  addItem: (product, variant, quantity) =>
    set((state) => {
      const exists = state.items.find((i) => i.variant.id === variant.id);

      const stock = Number(variant.stock);

      if (exists) {
        const newQuantity = exists.quantity + quantity;
        const maxQuantity = Math.min(newQuantity, stock);
        return {
          items: state.items.map((i) =>
            i.variant.id === variant.id ? { ...i, quantity: maxQuantity } : i
          ),
        };
      }

      const finalQuantity = Math.min(quantity, stock);

      return {
        items: [...state.items, { product, variant, quantity: finalQuantity }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.variant.id !== id),
    })),

  clear: () =>
    set(() => ({
      clientId: "",
      items: [],
    })),
}));
