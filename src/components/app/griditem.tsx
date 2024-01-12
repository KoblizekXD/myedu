'use client'

import { redirect } from "next/navigation"

interface GridItemProps {
  children: React.ReactNode
  className?: string
  title?: string
  insideClass?: string
  href?: string
}

export default function GridItem({ href, children, insideClass, className, title }: GridItemProps) {
  const redir = () => {
    if (href) {
      redirect(href)
    }
  }

  return (
    <div onClick={() => redir()} className={`rounded-lg p-4 flex transition ease-in-out duration-500 flex-col hover:border-sky-500 border-[#313537] border ${className}`}>
      <h2 className='text-xl font-bold'>{title}</h2>
      <div className={`grow ${insideClass}`}> 
        {children}
      </div>
    </div>
  )
}
