import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    userId: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
  }
}
