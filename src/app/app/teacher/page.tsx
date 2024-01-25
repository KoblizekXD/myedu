import { checkPermissions, fetchSession, rand } from "@/util/util"
import { redirect } from "next/navigation"

import 'material-symbols';
import { GridItem } from "@/components/app/select/griditem";

export default async function Teacher() {
  const session = await fetchSession()

  if (!checkPermissions('teacher', session)) {
    redirect('/app/home?error=unauthorized')
  } else return (
    <main className={'flex flex-col items-center gap-4 grow'}>
      <h1 className={'font-bold text-4xl mt-5'}>Vítejte zpět!</h1>
      <h2 className={'font-semibold text-xl'}>
        Tyto akce jsou dostupné pouze pro učitele a administrátory
      </h2>
      <div className={'w-full flex flex-col gap-4 justify-center items-center grow'}>
        <div className={'flex gap-4'}>
          <GridItem title="Vytvořit Předmět" />
          <GridItem title="Třídy" icon="school" />
          <GridItem title="Soubory" icon="upload_file" />
        </div>
        <div className={'flex gap-4'}>
          <GridItem title="Zapsat Předmět" icon="playlist_add_check" />
          <GridItem title="Známky" icon="checklist" />
          <GridItem title="Studenti" icon="person" />
        </div>
        <div>
        <GridItem title="Akce" icon="event" />
        </div>
      </div>
    </main>
  )
}