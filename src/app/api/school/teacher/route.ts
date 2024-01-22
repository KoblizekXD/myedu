import { checkPermissions, exclude, fetchSession } from "@/util/util";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { authconfig } from "../../auth/[...nextauth]/route";
import { getToken } from "next-auth/jwt";

const CreateTeacherBody = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  const session = await getServerSession(authconfig)
  if (session) {
    if (email) {
      const x = await prisma.user.findUnique({
        where: {
          email: email
        }
      }).teacher({
        include: {
          school: true,
          user: true
        }
      })
      if (x) {
        x.user = exclude(x?.user, ['password']) as User
        return x
      } else return NextResponse.json({ error: 'Object not found' }, { status: 404 })
    } else {
      const x = await prisma.user.findMany()
      if (x) {
        return NextResponse.json(x)
      } else return NextResponse.json({ error: 'Object not found' }, { status: 404 })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}

export async function POST(req: NextRequest) {
  const session = await fetchSession()

  if (session && checkPermissions('admin', session)) {
    const body = await req.json()
    if (CreateTeacherBody.safeParse(body).success) {
      await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          type: 'Teacher',
          teacher: {
            create: {
              school: {
                connect: {
                  id: session.user.schoolId
                }
              }
            }
          }
        }
      })
    } else {
      NextResponse.json({ error: 'Invalid body'}, { status: 400 })
    }
  } else {
    NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}