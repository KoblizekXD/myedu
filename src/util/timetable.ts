import { PeriodState } from '@prisma/client'

export interface PeriodTimings {
  periods: {
    start: string;
    end: string;
  }[];
  breaks: {
    start: string;
    end: string;
    length: number;
  }[];
  schoolStart?: string;
}
export function getMinuteTimeDifference(start: string, end: string): number {
  const startDate = new Date();
  const endDate = new Date();
  startDate.setHours(
    parseInt(start.split(":")[0]),
    parseInt(start.split(":")[1])
  );
  endDate.setHours(parseInt(end.split(":")[0]), parseInt(end.split(":")[1]));
  return Math.abs(endDate.getTime() - startDate.getTime()) / 1000 / 60;
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


/* export interface Period {
  day: number; // Index of days + 1
  timing: number; // Index of periodTimings.periods + 1
  name: string;
  shortName?: string;
  teacher?: string;
  room?: string;
  color?: string;
  state?: PeriodState;
  description?: string;
} */

export const days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek']