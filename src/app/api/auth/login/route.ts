import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const ses = getServerSession()
    
    let body = await req.json()
    return prisma.student.findUnique({
        where: {
            email: body.identity,
            password: body.password
        }
    })
}