import { NextResponse } from "next/server";

export async function GET() {
    await prisma.user.deleteMany({})
    await prisma.admin.deleteMany({})
    await prisma.school.deleteMany({})

    return NextResponse.json({ message: "OK" })
}