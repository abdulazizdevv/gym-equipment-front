import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: number | string;
      avatarUrl?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id?: number | string; // Backend user ID or Provider ID
    avatarUrl?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id?: number | string;
      name?: string;
      email?: string;
      avatarUrl?: string | null;
    };
  }
}
