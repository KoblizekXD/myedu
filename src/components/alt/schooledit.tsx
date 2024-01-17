'use client'

import TextInput from "@/components/textinput";
import TopInfo from "@/components/topinfo";
import { checkPermissions, fetchSession } from "@/util/util";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SchoolEdit({school}: {school: any}) {
  console.log(school)
  const [info, setInfo] = useState("")
  const [domain, setDomain] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = async (e: FormEvent) => {
      e.preventDefault()
      setInfo("Ukládám...")
      const res = await fetch('/api/school', {
        method: 'PUT',
        body: JSON.stringify({
          domain: domain,
          name: name
        })
      })
      if (res.ok) {
        setInfo("Úspěšně uloženo!")
      } else {
        setInfo('Stala se chyba! ' + res.status)
      }
  }

  return (
    <main className={'flex flex-col items-center gap-4 grow'}>
      {info && <TopInfo message={info} />}
      <h1 className={'font-bold text-4xl mt-5'}>Upravit nastavení školy</h1>
      <h2 className={'text-xl mt-5'}>
          Tato nastavení jsou globální pro celou školu.
      </h2>
      <div className={'grow flex justify-center items-center w-full'}>
          <form onSubmit={handleSubmit} className={'w-1/2 border flex flex-col gap-2 border-[#1e1e1e] rounded px-4 py-4'}>
          <h2 className={'text-xl ml-px font-semibold'}>Název Školy</h2>
          <TextInput onChange={(e) => setName(e.target.value)} className="w-full" value={school?.name} name="school" placeholder="Nový název"></TextInput>
          <h2 className={'text-xl ml-px font-semibold'}>Doména(email se nemění)</h2>
          <TextInput onChange={(e) => setDomain(e.target.value)} className="w-full" value={school?.domain} name="school" placeholder="Nová doména"></TextInput>
          <h2 className={'text-xl ml-px font-semibold'}>Logo</h2>
          <input className="border rounded text-center border-[#1d2537] p-4" type='file'></input>
          <button
              type="submit"
              className={`disabled:opacity-50 bg-purple-500 border-[0] w-full rounded text-white text-center py-3 px-3`}
          >
              Uložit
          </button>
          </form>
      </div>
    </main>
  )
}