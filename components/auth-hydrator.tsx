'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { getMe } from '@/lib/api/user';
import { useAuthStore } from '@/stores/auth';

export function AuthHydrator() {
  const { data: session, status } = useSession();
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  // Sync NextAuth session to Zustand Store
  useEffect(() => {
    if (status === "authenticated" && session?.accessToken && !token) {
      setAuth({
        token: session.accessToken as string,
        user: session.user as any,
      });
    } else if (status === "unauthenticated" && token) {
      // Clear store ONLY when confirmed unauthenticated
      logout();
    }
  }, [status, session, token, setAuth, logout]);

  // Existing hydration logic
  useEffect(() => {
    let cancelled = false;
    if (!token) return;
    if (user) return;

    (async () => {
      try {
        const me = await getMe();
        if (cancelled) return;
        setUser(me);
      } catch {
        if (cancelled) return;
        logout();
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [token, user, setUser, logout]);

  return null;
}
