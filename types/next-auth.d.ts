import { Admin, Student, Teacher, UserType } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      type?: UserType,
      teacher?: Teacher,
      student?: Student,
      admin?: Admin
    } & DefaultSession["user"]
  }
}
