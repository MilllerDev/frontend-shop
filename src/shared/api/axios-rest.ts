"use server";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosRest = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosRest.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     console.error(
//       "Error al hacer la petición: ",
//       error.response.data || error.message
//     );
//     return Promise.reject(error);
//   }
// );

export default axiosRest;
