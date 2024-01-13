import { config } from "@/app/api/auth/[...nextauth]/route";
import crypto from "crypto";
import { getServerSession } from "next-auth";

export function hash(pass: string) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}

type Permission = "admin" | "teacher" | "student";

/**
 * Checks if the user has the required permissions to access the endpoint/path
 * 
 * @param permissions the permissions required by the endpoint/path
 * @param session user session
 * @returns true if the user has the required permissions, false otherwise
 */
export function checkPermissions(permissions: Permission, session: any): boolean {
  if (permissions === 'student') {
    return true
  } else if (permissions === 'teacher' && session.user.teacher || session.user.admin) {
    return true
  } else if (permissions === 'admin' && session.user.admin) {
    return true
  } else return false
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