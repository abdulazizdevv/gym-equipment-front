"use client";

import { http } from "@/lib/api/http";

export type MeResponse = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt?: string;
};

export async function getMe() {
  const { data } = await http.get<MeResponse>("/user/me");
  return data;
}

