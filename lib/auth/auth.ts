import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/prisma/prisma";
import { loginFormSchema } from "../schema/loginFormSchema";
import bcrypt from "bcryptjs";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        const validatedFormData = loginFormSchema.safeParse(credentials);

        if (validatedFormData.success) {
          const { email, password } = validatedFormData.data;

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch)
            return {
              id: user.id.toString(),
              name: user.name,
              email: user.email,
              role: user.role,
            };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
    updateAge: 1 * 60 * 60, // 1 hour
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
