import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://notely-backend-60g6.onrender.com", // 👈 change this to your backend API URL if needed
  withCredentials: true, // optional (use if backend uses cookies/sessions)
});

export default axiosInstance;
