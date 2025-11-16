import { create } from "zustand";

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  variantId: string;
  color: string;
  size: string;
  stock: string;
  quantity: number;
  price: string;
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
      const exists = state.items.find((i) => i.id === newItem.id);

      if (exists) {
        return {
          items: state.items.map((i) =>
            i.id === newItem.id
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          ),
        };
      }

      return {
        items: [...state.items, newItem],
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
