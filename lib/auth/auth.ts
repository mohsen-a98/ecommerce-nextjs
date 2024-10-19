import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
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

          if (!user.password) return null;
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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60, // 12 hours
    updateAge: 1 * 60 * 60, // 1 hour
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const userEmail = user?.email;

        if (!userEmail) {
          return false;
        }
        const existingUser = await prisma.user.findUnique({
          where: {
            email: userEmail,
          },
        });

        if (!existingUser) {
          if (user?.name && user?.email) {
            const newUser = await prisma.user.create({
              data: {
                name: user?.name,
                email: user?.email,
                role: "USER",
              },
            });

            user.id = newUser.id.toString();
            user.role = newUser.role;
          } else {
            console.error("User data is incomplete");
            return false;
          }
        }

        if (existingUser) {
          user.id = existingUser.id.toString();
          user.role = existingUser.role;
        }
      }

      return true;
    },
    async authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update" && session.user) {
        token.name = session?.user?.name;
        token.email = session?.user?.email;
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
