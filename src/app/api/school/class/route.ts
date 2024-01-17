import { fetchSession } from "@/util/util";
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod";

const ClassCreateObject = z.object({
  name: z.string(),
  headTeacherId: z.string(),
  students: z.array(z.string()).optional() // Optional list of students to add
})

function isStringArray(arr: any[]): arr is string[] {
  return Array.isArray(arr) && arr.every(item => typeof item === 'string');
}

export default async function POST(req: NextRequest) {
  const body = await req.json()
  const session = await fetchSession()

  if (ClassCreateObject.safeParse(body).success === true) {
    const users: any = {}
    if (body.students != undefined && isStringArray(body.students)) {
      (body.students as string[]).forEach(v => {
        users.push({
          userId: v
        })
      })
    }
    await prisma.class.create({
      data: {
        name: body.name as string,
        school: {
          connect: {
            id: session?.user.admin.schoolId
          }
        },
        headTeacher: {
          connect: {
            userId: body.headTeacherId
          }
        },
        students: {
          connect: users
        }
      }
    })
  } else {
    NextResponse.json({error: 'Invalid body data'}, {status: 500})
  }
}