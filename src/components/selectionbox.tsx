'use client'

import "material-icons/iconfont/material-icons.css";
import { useState } from "react";

interface SelectionBoxProps {
  children?: React.ReactNode
  text?: string
  items?: string[]
}

export default function SelectionBox({children, text, items}: SelectionBoxProps) {
  
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')

  return (
    <div onClick={() => setIsOpen(!isOpen)} className={`${isOpen && 'border-b-0 rounded-b-none'} border-[#1d2537] w-1/6 relative select-none cursor-pointer text-[#9aa1ad] border rounded flex items-center p-2`}>
      {text || selected || 'Zvolit'}
      <span className="material-icons ml-auto">
        expand_more
      </span>
      <div className={`absolute ${!isOpen && 'hidden'} top-full border-x rounded-b border-x-[#1d2537] border-b-[#1d2537] border-b left-[0] right-[0] bg-[#161718] text-[#9aa1ad] flex flex-col gap-2 p-2`}>
        {items?.map((item, index) => (
          <div key={index} onClick={() => {
            if (selected == item) {
              setSelected('')
            } else {
              setSelected(item)
            }
          }} className={`hover:bg-[#1d2537] hover:text-white cursor-pointer rounded flex items-center p-2 ${selected == item && 'text-white'}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}