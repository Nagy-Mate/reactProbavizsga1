import axios from "axios";

export const BaseUrl = "http://localhost:8001/api";

const apiClient = axios.create({
  baseURL: BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
