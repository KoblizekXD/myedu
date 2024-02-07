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
  const datesStr = req.nextUrl.searchParams.getAll('dates')
  let date: Date[]
  if (dateStr)
    date = [new Date(dateStr)]
  else if (datesStr)
    date = datesStr.map(d => new Date(d))
  else
    date = [new Date()]
  if (!classId || isNaN(Number(classId))) {
    return NextResponse.json({error: 'Class id was not provided'}, {status: 500})
  } else {
    let res: any[] = []
    date.forEach(async (d, i) => {
      res.push({
        at: d,
        periods: await prisma.period.findMany({
          where: {
            subject: {
              classId: Number(classId)
            },
            at: d
          }
        })
      })
    })
    
    return NextResponse.json(res, {status: 200})
  }
}