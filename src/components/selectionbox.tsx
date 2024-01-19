'use client'

import "material-icons/iconfont/material-icons.css";
import { useState } from "react";

interface SelectionBoxProps {
  children?: React.ReactNode
  text?: string
}

export default function SelectionBox({children, text}: SelectionBoxProps) {
  
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div onClick={() => setIsOpen(!isOpen)} className={`${isOpen && 'border-b-0 rounded-b-none'} border-[#1d2537] w-1/6 relative select-none cursor-pointer text-[#9aa1ad] border rounded flex items-center p-2`}>
      {text || 'Zvolit'}
      <span className="material-icons ml-auto">
        expand_more
      </span>
      <div className={`absolute ${!isOpen && 'hidden'} top-full border-x rounded-b border-x-[#1d2537] border-b-[#1d2537] border-b left-[-2%] right-[-1%] bg-[#161718] text-[#9aa1ad] flex flex-col gap-2 p-2`}>
        {children}
      </div>
    </div>
  )
}