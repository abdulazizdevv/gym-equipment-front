import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        // Clear any prior accessToken on new sign-in
        delete token.accessToken

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user,
                providerAccountId: account.providerAccountId,
                accessToken: account.access_token,
              }),
            },
          )

          if (!response.ok) {
            console.error("Backend auth failed with status:", response.status)
            return token // Return token without accessToken
          }

          const data = await response.json()
          if (data.token) {
            token.accessToken = data.token
            token.user = data.user
          }
        } catch (error) {
          console.error("Backendda auth error:", error)
        }
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.accessToken = token.accessToken
        ;(session as any).user = {
          ...session.user,
          ...token.user,
        }
      }
      return session
    },
  },
})
