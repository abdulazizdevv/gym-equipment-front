"use client";

import { http } from "@/lib/api/http";

export type ApiUser = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: ApiUser;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export async function registerLocal(payload: RegisterPayload) {
  const { data } = await http.post<AuthResponse>("/auth/register", payload);
  return data;
}

export async function loginLocal(payload: LoginPayload) {
  const { data } = await http.post<AuthResponse>("/auth/login", payload);
  return data;
}

