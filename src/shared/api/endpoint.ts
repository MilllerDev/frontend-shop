export const API_ENDPONTS = {
  AUTH: {
    LOGIN: "/",
  },
  CLIENTS: {
    GET: "/clients",
    BY_ID: (id: string) => `/clients/${id}`,
  },
};
