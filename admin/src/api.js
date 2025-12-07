import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // your backend base URL
//   withCredentials: true,
});

export default API;
