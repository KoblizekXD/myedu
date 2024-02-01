

interface TimetableProps {
  className?: string
}

interface PeriodTimings {
  periods: {
    start: string
    end: string
  }[],
  breaks: {
    start: string
    end: string
    length: number
  }[],
  schoolStart?: string
}

function getMinuteTimeDifference(start: string, end: string): number {
  const startDate = new Date()
  const endDate = new Date()
  startDate.setHours(parseInt(start.split(':')[0]), parseInt(start.split(':')[1]))
  endDate.setHours(parseInt(end.split(':')[0]), parseInt(end.split(':')[1]))
  return Math.abs(endDate.getTime() - startDate.getTime()) / 1000 / 60
}

// Period format: HH:MM-HH:MM
export function createPeriodTimings(periods: string[]): PeriodTimings {
  let periodTimings: PeriodTimings = {
    periods: [],
    breaks: []
  }
  periods.forEach((period, i) => {
    if (i == 0) {
      periodTimings.schoolStart = period.split('-')[0]
    }
    // Create period
    periodTimings.periods.push({
      start: period.split('-')[0],
      end: period.split('-')[1]
    })
    // Create break if not last period
    if (i != periods.length - 1) {
      periodTimings.breaks.push({
        start: period.split('-')[1],
        end: periods[i + 1].split('-')[0],
        length: getMinuteTimeDifference(period.split('-')[1], periods[i + 1].split('-')[0])
      })
    }
  })
  return periodTimings
}

export function Timetable({className}: TimetableProps) {
  return (
    <table className={`${className} border rounded-md border-[#313537]`}>
      <thead>
        <tr>
          <th></th>
          <th>8:05 - 8:50</th>
          <th>8:55 - 9:40</th>
          <th>10:00 - 10:45</th>
          <th>10:50 - 11:35</th>
          <th>11:45 - 12:30</th>
          <th>12:35 - 13:20</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr>
        <tr>
          <td></td>
        </tr>
      </tbody>
    </table>
  )
}

export default function TimetablePage() {
  return (
    <main className={'my-6 mx-6 flex flex-col gap-2 w-full'}>
      <h1 className={'font-extrabold text-4xl'}>Rozvrh</h1>
      <Timetable className='h-1/2' />
    </main>
  );
}