'use client'

import Link from "next/link";
import "material-icons/iconfont/material-icons.css";
import TextInput from "@/components/textinput";
import SelectionBox from "@/components/selectionbox";
import { FormEvent, useState } from "react";
import TopInfo from "../topinfo";
import TopError from "../toperror";

interface NewClassProps {
  teacherMap: Map<string, string> // name -> id
}

export default function NewClass({teacherMap}: NewClassProps) {
  const [name, setName] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  async function createNewClass(e: FormEvent) {
    e.preventDefault()
    if (!name || !teacherId) {
      setMessage('')
      setError('Vyplňte prosím všechna pole')
      return
    }
    const res = await fetch('/api/school/class', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        headTeacherId: teacherId
      })
    })
    if (res.ok) {
      setError('')
      setMessage('Třída byla úspěšně vytvořena')
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
      <Link href={'/app/admin/classes'} className={'text-blue-500 items-center flex text-lg'}>
        <span className="material-icons">
          arrow_back
        </span>
        Zpět
      </Link>
      <div className={'grow flex justify-center'}>
        <form onSubmit={async (e) => await createNewClass(e)} className={'w-full flex gap-4 items-center flex-col'}>
          <h2 className={'text-xl font-semibold'}>Jméno nové třídy</h2>
          <TextInput onChange={(e) => setName(e.target.value)} name="class_name" placeholder='Jméno třídy' className={'w-1/6'} />
          <h2 className={'text-xl font-semibold'}>Zvolte třídního učitele</h2>
          <SelectionBox onSelect={i => setTeacherId(teacherMap.get(i) || '')} text={'Zvolit učitele'} items={[...teacherMap.keys()]} />
          <button
              type="submit"
              className={`disabled:opacity-50 bg-[#0066ff] border-[0] w-1/6 rounded text-white text-center py-3 px-3`}
            >
              Vytvořit třídu
            </button>
        </form>
      </div>
    </main>
  )
}