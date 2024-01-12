import { useRef } from "react"
import { number } from "zod"

type TimetableDay = 'Pondělí' | 'Úterý' | 'Středa' | 'Čtvrtek' | 'Pátek'

export class TimetablePeriod {
  constructor(
    public day: TimetableDay,
    public periods: number[],
    public subject: string
  ) {}
}

interface TimetableSmallProps {
  periods?: TimetablePeriod[]
}

export default function TimetableSmall({periods}: TimetableSmallProps) {
  let data: number[][] = [
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6],
    [1, 2, 3, 4, 5, 6]
  ]
  const dny: string[] = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek']

  return (
    <table className={'border border-spacing-0 rounded-md border-separate w-full mx-10'}>
      <thead>
        <tr>
          <th>Den</th>
          <th>1.</th>
          <th>2.</th>
          <th>3.</th>
          <th>4.</th>
          <th>5.</th>
          <th>6.</th>
        </tr>
      </thead>
      <tbody>
        {data.map((day, i) => (
          <tr key={i}>
            <td>{dny[i]}</td>
            {day.map((period, j) => (
              <td key={j}>
                <div>
                  {
                    periods?.find(p => p.day == dny[i] && p.periods.includes(j + 1))?.subject
                  }
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}