import axios, { AxiosInstance } from "axios";
import store from "@/redux/Store";
import { logoutAdmin, setAdminDetails } from "@/redux/adminSlice"; // Assuming these are your admin slice actions

const adminAxiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  withCredentials: true,
  timeout: 10000,
});

// Request Interceptor - Attach Access Token
adminAxiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.admin.adminInfo?.accessToken; 
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Token Expiry & Refresh
adminAxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const state = store.getState();
        const refreshToken = state.admin.adminInfo?.refreshToken;

        if (!refreshToken) {
          store.dispatch(logoutAdmin()); 
          return Promise.reject(error);
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken, admin } = response.data;


        store.dispatch(setAdminDetails({ 
          ...admin, 
          accessToken, 
          refreshToken: newRefreshToken 
        }));

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return adminAxiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutAdmin()); 
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default adminAxiosInstance;