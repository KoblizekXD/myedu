'use client'

import 'material-symbols';
import { useRouter } from "next/navigation"

export function GridItem({ title, icon, href }: { title: string, icon?: string, href?: string }) {
  const router = useRouter()
  return (
    <div onClick={() => {
      if (href) {
        router.push(href)
      }
    }} className={'h-[15vh] cursor-pointer select-none w-[10rem] items-center flex flex-col bg-[#1a1c1d] rounded-md'}>
      <div className={'h-[50%] flex items-center justify-center'}>
        <span className={`bg-[#222526] !text-[36px] p-2 material-symbols-outlined rounded text-violet-300`}>
          {icon || 'add'}
        </span>
      </div>
      <div className={'flex px-4 font-semibold justify-center text-center items-center grow'}>
        {title}
      </div>
    </div>
  )
  }