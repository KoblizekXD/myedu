import { checkPermissions, fetchSession } from "@/util/util"
import { redirect } from "next/navigation"

import "material-icons/iconfont/material-icons.css";

function GridItem({ title, icon }: { title: string, icon?: string }) {
  return (
    <div className={'h-[15vh] cursor-pointer select-none w-[10rem] items-center flex flex-col bg-[#1a1c1d] rounded-md'}>
      <div className={'h-[50%] flex items-center justify-center'}>
        <span className={"bg-[#222526] !text-[36px] p-2 material-icons rounded text-red-500"}>
          {icon || 'add'}
        </span>
      </div>
      <div className={'flex px-4 font-semibold justify-center text-center items-center grow'}>
        {title}
      </div>
    </div>
  )
}

export default async function Teacher() {
  const session = await fetchSession()

  if (!checkPermissions('teacher', session)) {
    redirect('/app/home?error=unauthorized')
  } else return (
    <main className={'flex flex-col items-center gap-4 grow'}>
      <h1 className={'font-bold text-4xl mt-5'}>Vítejte zpět!</h1>
      <h2 className={'font-semibold text-xl'}>Prosím zvolte příslušnou akci</h2>
      <div className={'w-full flex justify-center items-center grow'}>
        <div className={'flex gap-4'}>
          <GridItem title="Zapsat Předmět" />
          <GridItem title="Známky" icon="checklist" />
          <GridItem title="Studenti" icon="person" />
        </div>
      </div>
    </main>
  )
}