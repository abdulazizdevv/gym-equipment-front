'use client';

import { useEffect } from 'react';

import { getMe } from '@/lib/api/user';
import { useAuthStore } from '@/stores/auth';

export function AuthHydrator() {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

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
