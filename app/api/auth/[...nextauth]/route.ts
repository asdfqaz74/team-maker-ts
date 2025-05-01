import { findMemberId } from "@/utils/server";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MAX_AGE, NEXTAUTH_SECRET } from "@/constants";

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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
