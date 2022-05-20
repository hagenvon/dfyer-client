import axios from "axios";

export const API_ROOT =
  process.env.NODE_ENV === "production"
    ? "https://infamous.builders"
    : "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 30000,
});
