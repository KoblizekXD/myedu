import { config } from "@/app/api/auth/[...nextauth]/route";
import crypto from "crypto";
import { getServerSession } from "next-auth";

export function hash(pass: string) {
    return crypto.createHash('sha256').update(pass).digest('hex');
}

export async function fetchSession() {
    return await getServerSession(config)
}