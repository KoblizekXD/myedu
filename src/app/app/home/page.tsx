import GridItem from "@/components/app/griditem"
import TimetableSmall, { TimetablePeriod } from "@/components/app/timetable"
import TopError from "@/components/toperror"
import { fetchSession, translateError } from "@/util/util"

export default async function Home({searchParams}: any) {
  const error = searchParams.error
  const session = await fetchSession()
  const school = await prisma.school.findUnique({
    where: {
      id: (session?.user.admin && session?.user.admin.schoolId) || (session?.user.teacher && session?.user.teacher.schoolId) || (session?.user.student && session?.user.student.schoolId)
    }
  })
  return (
    <main className="mx-8 flex gap-2 flex-col my-8 w-full">
      {error && <TopError error={translateError(error)}/>}
      <h1 className={'font-extrabold text-4xl'}>Vítejte zpět!</h1>
      <h2 className={'text-xl'}>Přihlášen jako {session?.user?.name}({school?.name})</h2>
      <div className='w-full gap-4 grid-cols-2 grow grid'>
        <GridItem href="/" insideClass={'flex justify-center items-center'} className={'border-opacity-70 border-green-300'} title="Upomínky">
          <h3 className={'text-center font-bold text-xl text-red-400'}>V tento moment nejsou žádné akce dostupné</h3>
        </GridItem>
        <GridItem className={'border-opacity-70 border-red-300'} title="Známky"> </GridItem>
        <GridItem insideClass={'flex justify-center items-center'} className={'border-opacity-70 border-sky-300'} title="Rozvrh">
          <TimetableSmall periods={[new TimetablePeriod('Úterý', [1], "RVP"), new TimetablePeriod('Pondělí', [2], "A")]}></TimetableSmall>
        </GridItem>
        <GridItem className={'border-opacity-70 border-pink-300'} title="Stream"> </GridItem>
      </div>
    </main>
  )
}