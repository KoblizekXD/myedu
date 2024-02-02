import { Period, PeriodState, PeriodTimings, createPeriodTimings, days, getMinuteTimeDifference } from "@/util/timetable"


interface TimetableProps {
  className?: string,
  timings: PeriodTimings,
  periods: Period[]
}

export function renderPeriodCell(period: Period, key: number) {
  return (
    <td key={key} className={`${period.state != PeriodState.NORMAL && 'bg-red-400'}`}>
      <div className={`flex flex-col gap-1`}>
        <h2 className={'font-bold text-lg'}>{period.name}</h2>
        <p>{period.teacher}</p>
        <p>{period.room}</p>
      </div>
    </td>
  )
}

export function Timetable({className, timings, periods}: TimetableProps) {
  return (
    <table className={`${className} border rounded-md border-[#313537]`}>
      <thead>
        <tr>
          <th></th>
          {timings.periods.map((val, i) => {
            return <th key={i}>{val.start} - {val.end}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {days.map((day, i) => {
          const found = periods.filter(periods => periods.day === i + 1)
          return (
            <tr key={i}>
              <td>{day}</td>
              {timings.periods.map((val, i) => {
                if (found) {
                  const per = found.find(period => period.timing == i + 1)
                  if (per) {
                    return renderPeriodCell(per, i)
                  }
                }
                return <td key={i}></td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default function TimetablePage() {
  return (
    <main className={'my-6 mx-6 flex flex-col gap-2 w-full'}>
      <h1 className={'font-extrabold text-4xl'}>Rozvrh</h1>
      <Timetable periods={[
        {name: 'Matematika', teacher: 'Marek', room: 'A-1', day: 1, timing: 1, state: PeriodState.NORMAL},
      ]} timings={createPeriodTimings(['8:00-8:45'])} />
    </main>
  );
}