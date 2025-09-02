import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Mutator compatible with Orval generated calls: createAxiosInstance<T>(config)
export async function createAxiosInstance<T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  const finalConfig: AxiosRequestConfig = { ...(options ?? {}), ...config };
  const response: AxiosResponse<T> = await axiosClient.request<T>(finalConfig);
  return response.data;
}

