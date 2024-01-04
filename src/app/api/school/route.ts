"use server";

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, UserType } from "@prisma/client";
import crypto from "crypto";
import { z } from "zod";

const prisma = new PrismaClient();

export async function GET(req: NextRequest): Promise<NextResponse> {
  const domain = req.nextUrl.searchParams.get("domain");
  let school = await prisma.school.findFirst({
    where: {
      domain: domain || "",
    },
  });
  if (school) {
    return NextResponse.json(
      {
        domain: school.domain,
        name: school.name,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json({}, { status: 404 });
  }
}

function hash(pass: string) {
  return crypto.createHash('sha256').update(pass).digest('hex');
}

const NewSchoolSchema = z.object({
  domain: z.string(),
  name: z.string(),
  admin: z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(8),
  })
})

export async function POST(req: NextRequest) {
  
  const body = await req.json();
  if (NewSchoolSchema.safeParse(body).success === true) {
    prisma.school.create({
      data: {
        domain: body.domain,
        name: body.name,
        admins: {
          create: {
            user: {
              create: {
                email: body.admin.email,
                name: body.admin.name,
                type: UserType.Admin,
                password: hash(body.admin.password),
              }
            }
          }
        }
      }
    })
  } else {
    return NextResponse.json({ error: 'Invalid Json body' }, { status: 400 });
  }
}
