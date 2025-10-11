import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000", // 👈 change this to your backend API URL if needed
  withCredentials: true, // optional (use if backend uses cookies/sessions)
});

export default axiosInstance;
