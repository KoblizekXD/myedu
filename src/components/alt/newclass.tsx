'use client'

import Link from "next/link";
import "material-icons/iconfont/material-icons.css";
import TextInput from "@/components/textinput";
import SelectionBox from "@/components/selectionbox";
import { FormEvent, useState } from "react";

export default function NewClass() {
  const [name, setName] = useState('')
  const [teacherId, setTeacherId] = useState('')

  async function createNewClass(e: FormEvent) {
    e.preventDefault()
    await fetch('/api/school/class', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        headTeacherId: teacherId
      })
    })
  }

  return (
    <main className={'mx-6 my-6 flex flex-col gap-2 w-full'}>
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
          <SelectionBox onSelect={i => setTeacherId(i)} text={'Zvolit učitele'} items={['awdwwwwwwwwwwwwwwwwwww', 'wedakiwdjwai']} />
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