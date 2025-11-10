export const API_ENDPONTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },
  CLIENTS: {
    GET: "/clients",
    BY_ID: (id: string) => `/clients/${id}`,
  },
};
