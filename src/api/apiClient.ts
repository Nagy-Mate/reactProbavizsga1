import axios from "axios";
import type { User } from "../types/User";

export const BaseUrl = "http://localhost:8001/api";
const auth: User = JSON.parse(localStorage.getItem("user") ?? "{}");

const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  auth
});
export default apiClient;
