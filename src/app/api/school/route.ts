'use server'

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { URLSearchParams } from "url";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
    const domain = req.nextUrl.searchParams.get('domain')
    let school = await prisma.school.findFirst({
        where: {
            domain: domain || ''
        }
    });
    if (school) {
        return NextResponse.json({
            domain: school.domain,
            name: school.name
        }, { status: 200 })
    } else {
        return NextResponse.json({}, { status: 404 })
    }
}