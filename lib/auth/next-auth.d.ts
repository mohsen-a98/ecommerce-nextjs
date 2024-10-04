import { Role } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth/next";
import { jwt } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}
