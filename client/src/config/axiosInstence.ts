import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL as string,
    withCredentials: true,
    timeout: 10000,
});

export default axiosInstance;
