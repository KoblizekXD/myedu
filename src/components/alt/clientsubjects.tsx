'use client'

import { useState } from "react";
import Button from "../button";
import TextInput from "../textinput";

export default function ClientSubjects() {
  const students: any[] = []
  const [cls, setCls] = useState(students)
  const onTextChange = (e: any) => {
    const filtered = students?.filter((c) => {
      return c.name.includes(e.target.value)
    })
    if (filtered) {
      setCls(filtered)
    } else setCls([])
  }

  return (
    <main className={'mx-6 my-6 flex flex-col w-full'}>
      <h1 className={'font-extrabold text-4xl'}>Předměty</h1>
      <p>
        Úprava, vytváření a mazání předmětů,
        mějte na paměti, že některé akce mohou být nedostupné pro učitele
      </p>
      <div className={'flex grow'}>
        <div className={'border-r mt-6 border-r-[#313537] pr-6 flex flex-col gap-4 w-[20%]'}> {/*Toolkit*/}
          <h2 className={'font-bold text-2xl'}>Nástroje</h2>
          <TextInput onChange={(e) => onTextChange(e)} placeholder={'Vyhledat předmět'} name='search' />
          <Button className={'w-full bg-blue-600 border-0'} href='/app/admin/classes/new'>Nový předmět</Button>
        </div>
        <div className={'mt-6 flex flex-col grow ml-6'}>
          <h2 className={'font-bold text-2xl'}>Seznam</h2>
          <div className="grow h-full w-full">
            <div className={'border-b-[#313537] select-none px-2 flex border-b py-4'}>
              <div className={'text-xl font-semibold'}>Předmět</div>
              <div className={'text-xl font-semibold text-center w-full'}>Třída</div>
              <div className={'text-xl font-semibold text-center w-full'}>Učitel</div>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  )
}