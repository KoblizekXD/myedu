'use client'

import Link from "next/link";
import "material-icons/iconfont/material-icons.css";
import TextInput from "@/components/textinput";
import SelectionBox from "@/components/selectionbox";
import { FormEvent, useEffect, useState } from "react";
import TopInfo from "../topinfo";
import TopError from "../toperror";

interface NewClassProps {
  teacherMap: Map<string, string> // name -> id
}

export default function NewSubject({teacherMap}: NewClassProps) {
  const [name, setName] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [showSubjectEditor, setShowSubjectEditor] = useState(false)

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
      <h1 className={'font-extrabold text-4xl'}>Vytvořit nový předmět</h1>
      <Link href={'/app/teacher/subjects'} className={'text-blue-500 items-center flex text-lg'}>
        <span className="material-icons">
          arrow_back
        </span>
        Zpět
      </Link>
      <div className={'grow flex justify-center'}>
        <form onSubmit={async (e) => await createNewClass(e)} className={'w-full flex gap-4 items-center flex-col'}>
          <h2 className={'text-xl font-semibold'}>Jméno předmětu</h2>
          <TextInput onChange={(e) => setName(e.target.value)} name="class_name" placeholder='Jméno třídy' className={'w-1/6'} />
          <h2 className={'text-xl font-semibold'}>Zvolte učitele</h2>
          <SelectionBox onSelect={i => setTeacherId(teacherMap.get(i) || '')} text={'Zvolit učitele'} items={[...teacherMap.keys()]} />
          <h2 className={'text-xl font-semibold'}>Zvolte třídu</h2>
          <SelectionBox onSelect={i => {
            setShowSubjectEditor(true)
          }} text={'Zvolit učitele'} items={[...teacherMap.keys()]} />
          <SubjectEditor claimed={['1x1']} />
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

function SubjectEditor({claimed = []}: {claimed: string[]}) { // claimed format: 1x1 = monday, first hour
  return (
    <>
      <h1 className={'text-xl font-semibold'}>Editor hodin</h1>
      <div className={'border stdborder w-1/2 h-1/2 rounded p-2'}>
        <h1 className={'text-center pb-2 font-semibold'}>Hodiny</h1>
        <div className="flex">
          <div className={'flex pr-2 items-center'}>
            <h1 className="rotate-[-90deg] font-semibold text-center">Dny</h1>
          </div>
          <div className={'grid grid-rows-5 grid-cols-8 gap-2 *:flex *:justify-center *:py-2'}>
            {
              Array(5).fill(1).map((e, i) => {
                return (Array(8).fill(1).map((e, j) => {
                  const current = [i+1, j+1].join('x')
                  if (claimed.includes(current)) {
                    return (
                      <div key={current} className={'border-red-500 p-1 rounded text-white items-center border-collapse select-none border-4 text-center'}>
                        {current}
                      </div>
                    )
                  } else {
                    const [state, setState] = useState(false)
                    return (
                      <div key={current} onClick={() => {
                        setState(!state)
                      }} className={`border cursor-pointer select-none ${!state ? 'text-[#313537] stdborder' : 'border-sky-500'} items-center text-center  rounded border-dashed`}>
                        {state ? 'Zvoleno' : 'Zvolte kliknutím'}
                      </div>
                    )
                  }
                }))
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}