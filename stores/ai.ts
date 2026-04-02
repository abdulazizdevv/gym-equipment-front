"use client";

import { create } from "zustand";

import type { AiSearchData } from "@/lib/api/ai";

type AiState = {
  sessionId: number | null;
  data: AiSearchData | null;
  setResult: (payload: { sessionId: number; data: AiSearchData }) => void;
  clear: () => void;
};

export const useAiStore = create<AiState>((set) => ({
  sessionId: null,
  data: null,
  setResult: ({ sessionId, data }) => set({ sessionId, data }),
  clear: () => set({ sessionId: null, data: null }),
}));

