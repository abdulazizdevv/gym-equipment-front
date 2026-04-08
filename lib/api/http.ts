"use client"

import axios, { AxiosError } from "axios"

import { useAuthStore } from "@/stores/auth"

const baseURL = process.env.NEXT_PUBLIC_API_URL

type ApiErrorResponse = {
  message?: string
}

export const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
})

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
import { signOut } from "next-auth/react"

http.interceptors.response.use(
  (r) => r,
  async (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("muskul_auth")
        // Trigger Next-Auth signOut which also clears cookies and redirects
        await signOut({ redirect: true, callbackUrl: "/" })
      }
    }
    return Promise.reject(error)
  },
)

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const msg = (error.response?.data as ApiErrorResponse | undefined)?.message
    if (typeof msg === "string" && msg.trim()) return msg
    if (typeof error.message === "string" && error.message.trim())
      return error.message
  }
  return "Something went wrong."
}

export function getUploadUrl(pathOrUrl: string | null | undefined): string | null {
  if (!pathOrUrl) return null
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl
  }
  const base = process.env.NEXT_PUBLIC_API_URL ?? ""
  return `${base}${pathOrUrl}`
}
