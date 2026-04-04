"use client"

import { http } from "@/lib/api/http"

export type AiEquipment = {
  name: string
  confidence: number
}

export type AiUsage = {
  steps: string[]
  cues: string[]
  commonMistakes: string[]
}

export type AiImage = {
  url: string
  caption: string
}

export type AiSearchData = {
  equipment: AiEquipment
  muscles: string[]
  usage: AiUsage
  tips: string[]
  images: AiImage[]
}

export type AiPostEquipmentResponse = {
  type: "search" | "followup"
  sessionId: number
  postId: number
  data: AiSearchData
}

type AiLangOptions = {
  lang?: string
}

type AiListQueryOptions = AiLangOptions & {
  page?: number
  limit?: number
  q?: string
}

function withLangHeaders(lang?: string) {
  const value = lang?.trim()
  if (!value) return undefined
  return { lang: value, "x-lang": value }
}

export async function postAiEquipmentSearch(
  payload: { image: File; question?: string } & AiLangOptions,
) {
  const form = new FormData()
  form.append("image", payload.image)
  if (payload.question && payload.question.trim()) {
    form.append("question", payload.question.trim())
  }

  const { data } = await http.post<AiPostEquipmentResponse>(
    "/ai/equipment",
    form,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        ...withLangHeaders(payload.lang),
      },
    },
  )
  return data
}

export async function postAiEquipmentFollowup(
  payload: { sessionId: number; question: string } & AiLangOptions,
) {
  const { data } = await http.post<AiPostEquipmentResponse>(
    "/ai/equipment",
    { sessionId: payload.sessionId, question: payload.question },
    { headers: withLangHeaders(payload.lang) },
  )
  return data
}

export type AiSessionPost = {
  id: number
  type: "search" | "followup"
  imageUrl: string | null
  request: unknown
  result: AiSearchData
  createdAt: string
}

/** GET /ai/sessions/:id — yangi API: bitta `data`; eski: `posts[]` */
export type AiSessionResponse = {
  id: number
  createdAt: string
  data?: AiSessionPost
  posts?: AiSessionPost[]
}

export function getSessionPosts(session: AiSessionResponse): AiSessionPost[] {
  if (Array.isArray(session.posts) && session.posts.length > 0) {
    return session.posts
  }
  if (session.data) {
    return [session.data]
  }
  return []
}

export function getLatestSessionPost(
  session: AiSessionResponse | undefined,
): AiSessionPost | undefined {
  if (!session) return undefined
  const posts = getSessionPosts(session)
  return posts[posts.length - 1]
}

/** Yuklangan foydalanuvchi rasmi (odatda `search` postdagi `imageUrl`). */
export function getSessionUploadImageUrl(
  session: AiSessionResponse | undefined,
): string | null {
  if (!session) return null
  const posts = getSessionPosts(session)
  const post =
    posts.find((p) => p.type === "search" && p.imageUrl) ??
    posts.find((p) => p.imageUrl)
  return post?.imageUrl ?? null
}

export function getLatestSessionResult(
  session: AiSessionResponse | undefined,
): AiSearchData | null {
  return getLatestSessionPost(session)?.result ?? null
}

export type AiSessionListItem = {
  id: number
  createdAt: string
  lastActivityAt?: string
  postCount?: number
  imageUrl?: string | null
  title?: string | null
  primaryMuscle?: string | null
}

export type AiSessionsMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
  q?: string
  sortBy?: string
  order?: string
}

export type AiSessionsListResponse = {
  meta: AiSessionsMeta
  items: AiSessionListItem[]
}

export async function getAiSessionById(id: number, options?: AiLangOptions) {
  const { data } = await http.get<AiSessionResponse>(`/ai/sessions/${id}`, {
    headers: withLangHeaders(options?.lang),
  })
  return data
}

export async function getAiSessions(options?: AiListQueryOptions) {
  const { data } = await http.get<
    | AiSessionListItem[]
    | {
        items?: AiSessionListItem[]
        data?: AiSessionListItem[]
        meta?: AiSessionsMeta
      }
  >("/ai/sessions", {
    headers: withLangHeaders(options?.lang),
    params: {
      page: options?.page,
      limit: options?.limit,
      q: options?.q,
    },
  })

  if (Array.isArray(data)) {
    return {
      meta: {
        page: options?.page ?? 1,
        limit: options?.limit ?? data.length,
        total: data.length,
        totalPages: 1,
        q: options?.q,
      },
      items: data,
    }
  }

  const items = Array.isArray(data?.items)
    ? data.items
    : Array.isArray(data?.data)
      ? data.data
      : []
  return {
    meta: {
      page: data?.meta?.page ?? options?.page ?? 1,
      limit: data?.meta?.limit ?? options?.limit ?? items.length,
      total: data?.meta?.total ?? items.length,
      totalPages: data?.meta?.totalPages ?? 1,
      q: data?.meta?.q ?? options?.q,
      sortBy: data?.meta?.sortBy,
      order: data?.meta?.order,
    },
    items,
  }
}

export async function deleteAiSession(id: number, options?: AiLangOptions) {
  const { data } = await http.delete<{ message: string }>(
    `/ai/sessions/${id}`,
    {
      headers: withLangHeaders(options?.lang),
    },
  )
  return data
}

export async function postAiGenerateImage(
  payload: { sessionId: number; postId: number } & AiLangOptions,
) {
  const { data } = await http.post<{ message: string }>(
    `/ai/sessions/${payload.sessionId}/posts/${payload.postId}/generate-image`,
    {},
    { headers: withLangHeaders(payload.lang) },
  )
  return data
}
