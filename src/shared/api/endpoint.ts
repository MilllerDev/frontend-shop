export const API_ENDPONTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  CLIENTS: {
    GET: "/clients",
    BY_ID: (id: string) => `/clients/${id}`,
  },
  CATEGORIES: {
    GET: "/categories",
  },
  PRODUCTS: {
    GET: "/products",
    CREATE: "/products",
    BY_ID: (id: string) => `/products/${id}`,
  },
};
