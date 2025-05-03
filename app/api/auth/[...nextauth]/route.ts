import { findMemberId } from "@/utils/server";
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MAX_AGE, NEXTAUTH_SECRET } from "@/constants";
import { JWT } from "next-auth/jwt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userId: { label: "User ID", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.userId || !credentials.password) return null;

        const { userId } = credentials;
        const member = await findMemberId({ userId });

        if (!member || !member.password) return null;

        const isMatch = await bcrypt.compare(
          credentials.password,
          member.password
        );
        if (!isMatch) return null;

        return {
          id: member.id,
          name: member.name,
          userId: member.userId,
          email: member.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: MAX_AGE,
  },
  secret: NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.userId = (user as any).userId;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.userId = token.userId as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
