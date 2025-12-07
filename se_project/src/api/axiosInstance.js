// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    config.headers["ngrok-skip-browser-warning"] = "69420";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;