"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "@/i18n/navigation"
import { useAuthStore } from "@/stores/auth"
import { Loader2 } from "lucide-react"

export default function GoogleCallbackPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const setAuth = useAuthStore((s) => s.setAuth)

    useEffect(() => {
      if (status === "loading") return
  
      if (status === "unauthenticated" || !session?.user) {
        router.push("/auth")
        return
      }
  
      if (status === "authenticated" && session.user) {
        const token = (session as any).accessToken
        
        // If the token is missing or is still a Google token (starts with ya29.), 
        // then backend auth failed.
        if (!token || token.startsWith('ya29.')) {
          console.error("Backend token missing or invalid. Received:", token?.substring(0, 5))
          // Clear everything and return to login
          setAuth({ token: "", user: null as any })
          window.localStorage.removeItem("muskul_auth")
          router.push("/auth")
          return
        }

        const userId = typeof session.user.id === 'string' 
          ? parseInt(session.user.id.replace(/\D/g, '').substring(0, 8) || "0", 10) 
          : (typeof session.user.id === 'number' ? session.user.id : 0);
  
        const user = {
          id: userId,
          name: session.user.name || "Google User",
          email: session.user.email || "",
          avatarUrl: session.user.image || null,
        }
  
        // Update Zustand
        setAuth({ token, user })
  
        // Push to dashboard
        router.push("/dashboard")
      }
    }, [session, status, router, setAuth])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Authenticating...
        </p>
      </div>
    </div>
  )
}
