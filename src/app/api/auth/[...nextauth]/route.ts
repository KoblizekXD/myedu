import { hash } from "@/util/util";
import { PrismaClient } from "@prisma/client";
import { randomBytes, randomUUID } from "crypto";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identity: { label: "Identita", type: "text" },
        password: { label: "Heslo", type: "password" },
      },
      authorize: async (credentials, req) => {
        return await prisma.user.findUnique({
          where: {
            email: credentials?.identity,
            password: hash(credentials?.password as string)
          }
        })
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
  }
});

export { handler as GET, handler as POST };
