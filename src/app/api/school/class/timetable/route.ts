import { NextRequest, NextResponse } from "next/server";
import { describe } from "node:test";

export async function GET(req: NextRequest) {
  const classId = req.nextUrl.searchParams.get('id')
  if (!classId || isNaN(Number(classId))) {
    return NextResponse.json({error: 'Class id was not provided'}, {status: 500})
  } else {
    const rets: any = []
    const subjects = await prisma.class.findUnique({
      where: {
        id: Number(classId)
      }
    }).subjects()
    if (subjects) {
      subjects.forEach(async subject => {
        const periods = await prisma.period.findMany({
          where: {
            subjectId: subject.id,
          }
        })
        if (periods) {
          periods.forEach(period => {
            
          })
        }
      })
    } else {
      return NextResponse.json({error: 'Class or subject was not found'}, {status: 404})
    }
  }
}