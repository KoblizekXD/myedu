import GridItem from "@/components/app/griditem"
import { fetchSession } from "@/util/util"

export default async function Home() {
  const session = await fetchSession()

  return (
    <main className="mx-8 flex gap-2 flex-col my-8 w-full">
      <h1 className={'font-extrabold text-4xl'}>Vítejte zpět!</h1>
      <h2 className={'text-xl'}>Přihlášen jako {session?.user?.name}</h2>
      <div className='w-full gap-4 grid-cols-2 grow grid'>
        <GridItem className={'border-opacity-70 border-green-300'} title="Akce"> </GridItem>
        <GridItem className={'border-opacity-70 border-red-300'} title="Známky"> </GridItem>
        <GridItem className={'border-opacity-70 border-sky-300'} title="Rozvrh"> </GridItem>
        <GridItem className={'border-opacity-70 border-pink-300'} title="Stream"> </GridItem>
      </div>
    </main>
  )
}