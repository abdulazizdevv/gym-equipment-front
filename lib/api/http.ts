"use client";

import axios, { AxiosError } from "axios";

import { useAuthStore } from "@/stores/auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

type ApiErrorResponse = {
  message?: string;
};

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (r) => r,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
    }
    return Promise.reject(error);
  },
);

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg = (error.response?.data as ApiErrorResponse | undefined)?.message;
    if (typeof msg === "string" && msg.trim()) return msg;
    if (typeof error.message === "string" && error.message.trim()) return error.message;
  }
  return "Something went wrong.";
}

