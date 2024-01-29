import { checkPermissions, fetchSession, hash } from "@/util/util";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const UserUpdateBody = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  userType: z.enum(['student', 'teacher', 'admin']).optional()
})

export async function PUT(req: NextRequest) {
  const session = await fetchSession()

  if (session && checkPermissions('admin', session)) {
    const body = await req.json()
    const data: any = {}
    if (body.name) data.name = body.name
    if (body.email) data.email = body.email
    if (body.password) data.password = hash(body.password)
    if (body.userType) data.type = body.userType
    if (UserUpdateBody.safeParse(body).success) {
      try {
        await prisma.user.update({
          where: {
            id: body.id
          },
          data: data
        })
        return NextResponse.json({ success: true })
      } catch (e) {
        if (e instanceof PrismaClientKnownRequestError) {
          return NextResponse.json({ error: e.message }, { status: 400 })
        } else {
          return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
      }
    } else {
      return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}