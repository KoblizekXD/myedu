import GridItem from "@/components/app/griditem"
import { fetchSession } from "@/util/util"

export default async function Home() {
  const session = await fetchSession()

  return (
    <main className="mx-8 flex flex-col my-8 w-full">
      <h1 className={'font-extrabold text-4xl'}>Vítejte zpět!</h1>
      <h2 className={'ml-2 text-xl'}>Přihlášen jako {session?.user?.name}</h2>
      <div className='w-full gap-4 grid-cols-2 grow grid'>
        <GridItem>Yeah1</GridItem>
        <GridItem>Yeah2</GridItem>
        <GridItem>Yeah3</GridItem>
      </div>
    </main>
  )
}