import Timetable from "@/components/alt/clienttimetable";
import { createPeriodTimings } from "@/util/timetable";
import { Period, PeriodState } from "@prisma/client";
import { headers } from "next/headers";

export default async function TimetablePage() {
  const cla = await prisma.class.findFirst()
  const res = await fetch(process.env.NEXTAUTH_URL + '/api/school/timetable?id=' + cla?.id, {method: 'GET', headers: new Headers(headers())});
  const example: Period = {
    id: 0,
    name: 'Matematika',
    shortName: 'Mat',
    subjectId: 0,
    teacher: 'Marek',
    room: 'A-1',
    at: new Date(2024, 2, 6),
    timing: 1,
    state: PeriodState.RoomChange,
    topic: null,
    notes: null
  }

  return (
    <main className={'my-6 mx-6 flex flex-col gap-2 w-full'}>
      <h1 className={'font-extrabold text-4xl'}>Rozvrh</h1>
      <Timetable periods={[
        example,
      ]} timings={createPeriodTimings(['8:00-8:45'])} />
    </main>
  );
}