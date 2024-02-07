import { NextRequest, NextResponse } from "next/server";

/**
 * 
 * @param id class id
 * @param date date to obtain timetable for(only date is considered, time is ignored)
 * @returns Periods for the given class and date
 */
export async function GET(req: NextRequest) {
  const classId = req.nextUrl.searchParams.get('id')
  const dateStr = req.nextUrl.searchParams.get('date')
  let date: Date
  if (dateStr)
    date = new Date(dateStr)
  else
    date = new Date()
  if (!classId || isNaN(Number(classId))) {
    return NextResponse.json({error: 'Class id was not provided'}, {status: 500})
  } else {
    const res = prisma.period.findMany({
      where: {
        subject: {
          classId: Number(classId)
        },
        at: new Date(date)
      }
    })
    
    return NextResponse.json({
      at: date,
      periods: res
    }, {status: 200})
  }
}