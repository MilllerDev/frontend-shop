export const API_ROOT = {
  AUTH: {
    LOGIN: "/auth/login",
    GET: "/auth/check-auth-status",
  },
  CLIENTS: {
    GET: "/clients",
    CREATE: "/clients",
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
  SALES: {
    GET: "/sales",
    POST: "/sales",
  },
};
