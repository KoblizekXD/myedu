import GridItem from "@/components/app/griditem"
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
        <GridItem className={'border-opacity-70 border-sky-300'} title="Rozvrh">
          <table className={'border w-full'}>
            <thead>
              <tr>
                <th colSpan={6}>Rozvrh pro Pondělí</th>
              </tr>
              <tr className={'*:border'}>
                <th>1.</th>
                <th>2.</th>
                <th>3.</th>
                <th>4.</th>
                <th>5.</th>
                <th>6.</th>
              </tr>
            </thead>
            <tbody>
              <tr className={'*:border'}>
                <td>M</td>
                <td>M</td>
                <td>M</td>
                <td>M</td>
                <td>M</td>
                <td>M</td>
              </tr>
            </tbody>
          </table>
        </GridItem>
        <GridItem className={'border-opacity-70 border-pink-300'} title="Stream"> </GridItem>
      </div>
    </main>
  )
}