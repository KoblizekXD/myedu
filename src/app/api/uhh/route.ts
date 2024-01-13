import { NextResponse } from "next/server";

// THERE IS NO WAY THIS WOULD BE PUSHED TO PROD
// THIS IS JUST FOR TESTING PURPOSES
export async function GET() {
    await prisma.user.deleteMany({})
    await prisma.admin.deleteMany({})
    await prisma.school.deleteMany({})

    return NextResponse.json({ message: "OK" })
}