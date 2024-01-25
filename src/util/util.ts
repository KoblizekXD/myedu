import { authconfig } from "@/app/api/auth/[...nextauth]/route";
import crypto from "crypto";
import { getServerSession } from "next-auth";

export function hash(pass: string) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}

export type Permission = "admin" | "teacher" | "student";

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
  } else if (permissions === 'teacher' && (session.user.teacher != null || session.user.admin != null)) {
    return true
  } else if (permissions === 'admin' && session.user.admin) {
    return true
  } else return false
}
/**
 * Gets a random element from the array
 * @param arr Array
 * @returns Random element from the array
 */
export function rand(arr: any[]): any {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function translateError(id: string): string {
  if (id == 'unauthorized') {
    return 'K této stránce nemáte přístup'
  } else return id
}

export function generatePassword() {
  var length = 8,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

export function exclude<User extends object, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  const result: Partial<User> = {};

  for (const [key, value] of Object.entries(user ?? {})) {
    if (!keys.includes(key as Key)) {
      result[key] = value;
    }
  }

  return result as Omit<User, Key>;
}

export function getDomainFromEmail(email: string) {
  return email.split('@')[1]
}

export async function fetchSession() {
  return await getServerSession(authconfig)
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