'use client'

import Link from "next/link";
import "material-icons/iconfont/material-icons.css";
import TextInput from "@/components/textinput";
import SelectionBox from "@/components/selectionbox";
import { FormEvent, useState } from "react";
import TopInfo from "../topinfo";
import TopError from "../toperror";
import { UserType } from "@prisma/client";

export default function NewTeacher({header}: {header: Headers}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [perm, setPerm] = useState<UserType>('Teacher')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function convertPerm(perm: string): UserType {
    switch (perm) {
      case 'Učitel':
        return 'Teacher'
      case 'Administrátor':
        return 'Admin'
      default:
        return 'Teacher'
    }
  }

  async function createNewClass(e: FormEvent) {
    e.preventDefault()
    if (!name || !email || !perm) {
      setMessage('')
      setError('Vyplňte prosím všechna pole')
      return
    }

    let res: Response
    if (perm === 'Teacher') {
      res = await fetch('/api/school/teacher', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email
        }),
        headers: new Headers(header)
      })
    } else {
      res = await fetch('/api/school/admin', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email
        }),
        headers: new Headers(header)
      })
    }
    
    if (res.ok) {
      setError('')
      setMessage('Nový profil učitele byl úspěšně vytvořen!')
    } else {
      setMessage('')
      setError(`Něco se pokazilo: ${(await res.json()).error}`)
    }
  }

  return (
    <main className={'mx-6 my-6 flex flex-col gap-2 w-full'}>
      {message && <TopInfo message={message} />}
      {error && <TopError error={error} />}
      <h1 className={'font-extrabold text-4xl'}>Vytvořit novou třídu</h1>
      <Link href={'/app/admin/teachers'} className={'text-blue-500 items-center flex text-lg'}>
        <span className="material-icons">
          arrow_back
        </span>
        Zpět
      </Link>
      <div className={'grow flex justify-center'}>
        <form onSubmit={async (e) => await createNewClass(e)} className={'w-full flex gap-4 items-center flex-col'}>
          <h2 className={'text-xl font-semibold'}>Jméno učitele</h2>
          <TextInput onChange={(e) => setName(e.target.value)} name="class_name" placeholder='např. Petr Pavel' className={'w-1/6'} />
          <h2 className={'text-xl font-semibold'}>Email</h2>
          <TextInput onChange={(e) => setEmail(e.target.value)} name="class_name" placeholder='petr.pavel@spst.cz' className={'w-1/6'} />
          <h2 className={'text-xl font-semibold'}>Permise</h2>
          <SelectionBox onSelect={(e) => setPerm(convertPerm(e))} text='Zvolit permisi(nebo Učitel)' items={['Učitel', 'Administrátor']} />
          <h3 className={'text-l italic text-gray-600 text-justify w-1/4'}>
            Z bezpečnostních důvodů bude heslo automaticky vygenerováno.
            Toto heslo, půjde později v nastavení změnit.
          </h3>
          <button
              type="submit"
              className={`disabled:opacity-50 bg-[#0066ff] border-[0] w-1/6 rounded text-white text-center py-3 px-3`}
            >
              Vytvořit učitele
            </button>
        </form>
      </div>
    </main>
  )
}