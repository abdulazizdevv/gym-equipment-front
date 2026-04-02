"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type AuthState = {
  token: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string | null;
    createdAt?: string;
  } | null;
  setToken: (token: string | null) => void;
  setUser: (user: AuthState["user"]) => void;
  setAuth: (auth: { token: string; user: NonNullable<AuthState["user"]> }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setAuth: ({ token, user }) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
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
);

