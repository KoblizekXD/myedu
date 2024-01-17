"use server";

import { NextRequest, NextResponse } from "next/server";
import { UserType } from "@prisma/client";

import crypto from "crypto";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authconfig } from "../auth/[...nextauth]/route";
import { checkPermissions } from "@/util/util";

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
    await prisma.school.create({
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
    return NextResponse.json({}, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Invalid Json body' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authconfig)
  if (!checkPermissions('admin', session)) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 200})
  } else {
    const body = await req.json()
    const data: any = {}
    if (body.email) data['domain'] = body.domain
    if (body.name) data['name'] = body.name
    await prisma.school.update({
      where: {
        id: session?.user.admin.schoolId
      },
      data: data
    })
    return NextResponse.json({}, {status: 200})
  }
}