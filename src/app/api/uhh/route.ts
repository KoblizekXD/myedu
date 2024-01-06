import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    await prisma.user.deleteMany({})
    await prisma.admin.deleteMany({})
    await prisma.school.deleteMany({})

    return NextResponse.json({ message: "OK" })
}