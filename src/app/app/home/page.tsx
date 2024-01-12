import GridItem from "@/components/app/griditem"
import TimetableSmall, { TimetablePeriod } from "@/components/app/timetable"
import { fetchSession } from "@/util/util"

export default async function Home() {
  const session = await fetchSession()

  return (
    <main className="mx-8 flex gap-2 flex-col my-8 w-full">
      <h1 className={'font-extrabold text-4xl'}>Vítejte zpět!</h1>
      <h2 className={'text-xl'}>Přihlášen jako {session?.user?.name}</h2>
      <div className='w-full gap-4 grid-cols-2 grow grid'>
        <GridItem href="/" insideClass={'flex justify-center items-center'} className={'border-opacity-70 border-green-300'} title="Akce">
          <h3 className={'text-center font-bold text-xl text-red-400'}>V tento moment nejsou žádné akce dostupné</h3>
        </GridItem>
        <GridItem className={'border-opacity-70 border-red-300'} title="Známky"> </GridItem>
        <GridItem insideClass={'flex justify-center items-center'} className={'border-opacity-70 border-sky-300'} title="Rozvrh">
          <TimetableSmall periods={[new TimetablePeriod('Pondělí', [1, 2], "RVP")]}></TimetableSmall>
        </GridItem>
        <GridItem className={'border-opacity-70 border-pink-300'} title="Stream"> </GridItem>
      </div>
    </main>
  )
}