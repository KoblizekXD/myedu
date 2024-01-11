import prisma, { hash } from "@/util/util";
import { PrismaClient, UserType } from "@prisma/client";
import { randomBytes, randomUUID } from "crypto";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const config = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identity: { label: "Identita", type: "text" },
        password: { label: "Heslo", type: "password" },
      },
      authorize: async (credentials, req) => {
        const data = await prisma.user.findUnique({
          where: {
            email: credentials?.identity,
            password: hash(credentials?.password as string)
          }
        })
        return data
      }
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
    async session({session}) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email
        },
        include: {
          student: true,
          teacher: true,
          admin: true
        }
      })
      session.user = {
        ...session.user,
        type: user?.type as UserType,
        teacher: user?.teacher,
        student: user?.student,
        admin: user?.admin
      }
      return session
    }
  }
} satisfies NextAuthOptions

const handler = NextAuth(config);

export { handler as GET, handler as POST };
