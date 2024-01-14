import { GridItem } from "@/components/app/select/griditem";
import { checkPermissions, fetchSession } from "@/util/util";
import { redirect } from "next/navigation";

export default async function Admin() {
  const session = await fetchSession()

  if (!checkPermissions('admin', session)) {
    redirect('/app/home?error=unauthorized')
  } else return (
    <main className={'flex flex-col items-center gap-4 grow'}>
      <h1 className={'font-bold text-4xl mt-5'}>Vítejte zpět!</h1>
      <h2 className={'font-semibold text-xl'}>
        Tyto akce jsou dostupné pouze pro administrátory
      </h2>
      <div className={'w-full flex flex-col gap-4 justify-center items-center grow'}>
        <div className={'flex gap-4'}>
          <GridItem title="Třídy" icon="class" />
          <GridItem href="/app/admin/school" title="Nastavení školy" icon="school" />
        </div>
        <div className={'flex gap-4'}>
          <GridItem title="Zapsat Předmět" icon="playlist_add_check" />
          <GridItem title="Účty" icon="person" />
        </div>
      </div>
    </main>
  )
}