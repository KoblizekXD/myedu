import { config } from "@/app/api/auth/[...nextauth]/route";
import crypto from "crypto";
import { getServerSession } from "next-auth";

export function hash(pass: string) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}

export async function fetchSession() {
    return await getServerSession(config)
}

import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }

  prisma = global.prisma
}

export default prisma