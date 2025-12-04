// src/api/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    // [핵심] ngrok 경고 무시 헤더 (이게 없으면 401이 뜰 수도 있음)
    "ngrok-skip-browser-warning": "69420",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // 1. 로컬 스토리지에서 토큰 꺼내기
    const token = localStorage.getItem("token");
    
    // 2. 토큰이 있다면 헤더에 추가 ('Bearer ' 공백 주의!)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // 3. ngrok 헤더 재확인
    config.headers["ngrok-skip-browser-warning"] = "69420";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
