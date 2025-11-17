import { Category } from "@/src/shared/types/product";
import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  imageUrl: string;
  color: string;
  size: string;
  stock: string;
  quantity: number;
  price: string;
  variantId: string;
  category: Category;
}

interface SaleStore {
  clientId: string;
  items: CartItem[];
  setClient: (id: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
}

export const useSaleStore = create<SaleStore>((set) => ({
  clientId: "",
  items: [],

  setClient: (id) =>
    set(() => ({
      clientId: id,
    })),

  addItem: (newItem) =>
    set((state) => {
      const exists = state.items.find(
        (i) => i.id === newItem.id && i.variantId === newItem.variantId
      );

      if (exists) {
        const newQuantity = exists.quantity + newItem.quantity;
        const maxQuantity = Math.min(newQuantity, Number(newItem.stock));
        return {
          items: state.items.map((i) =>
            i.id === newItem.id && i.variantId === newItem.variantId
              ? { ...i, quantity: maxQuantity }
              : i
          ),
        };
      }

      const finalQuantity = Math.min(newItem.quantity, Number(newItem.stock));

      return {
        items: [...state.items, { ...newItem, quantity: finalQuantity }],
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  clear: () =>
    set(() => ({
      clientId: "",
      items: [],
    })),
}));
