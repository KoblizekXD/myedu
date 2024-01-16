"use server";

import { NextRequest, NextResponse } from "next/server";
import { UserType } from "@prisma/client";

import crypto from "crypto";
import { z } from "zod";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { config } from "../auth/[...nextauth]/route";
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

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, config)
  if (!checkPermissions('admin', session)) {
    res.status(403).json({ error: 'Unauthorized' })
  } else {
    const data: any = {}
    if (req.body.email) data['domain'] = req.body.domain
    if (req.body.name) data['name'] = req.body.name
    await prisma.school.update({
      where: {
        id: session?.user.admin.schoolId
      },
      data: data
    })
    res.status(200)
  }
}