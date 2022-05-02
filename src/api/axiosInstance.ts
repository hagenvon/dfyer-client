import axios from "axios";

export const API_ROOT =
  process.env.REACT_APP_API_ROOT || "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 30000,
});
