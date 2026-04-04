"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

type AuthState = {
  token: string | null
  user: {
    id: number
    name: string
    email: string
    avatarUrl: string | null
    createdAt?: string
  } | null
  setToken: (token: string | null) => void
  setUser: (user: AuthState["user"]) => void
  setAuth: (auth: {
    token: string
    user: NonNullable<AuthState["user"]>
  }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => {
        set({ token })
        if (typeof window !== "undefined") {
          if (token)
            document.cookie = `gymai_auth_token=${token}; path=/; max-age=2592000; samesite=lax`
          else
            document.cookie =
              "gymai_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      },
      setUser: (user) => set({ user }),
      setAuth: ({ token, user }) => {
        set({ token, user })
        if (typeof window !== "undefined") {
          document.cookie = `gymai_auth_token=${token}; path=/; max-age=2592000; samesite=lax`
        }
      },
      logout: () => {
        set({ token: null, user: null })
        if (typeof window !== "undefined") {
          document.cookie =
            "gymai_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      },
    }),
    {
      name: "gymai_auth",
      storage: createJSONStorage(() =>
        typeof window !== "undefined"
          ? window.localStorage
          : {
              getItem: () => null,
              setItem: () => {},
              removeItem: () => {},
            },
      ),
      partialize: (s) => ({ token: s.token, user: s.user }),
    },
  ),
)
