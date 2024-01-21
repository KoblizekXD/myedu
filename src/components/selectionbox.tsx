'use client'

import "material-icons/iconfont/material-icons.css";
import { useState } from "react";

interface SelectionBoxProps {
  text?: string
  items?: string[]
  multiple?: boolean
  onSelect?: (selected: string) => void
}

export default function SelectionBox({text, items, onSelect}: SelectionBoxProps) {
  
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const [selecteds, setSelecteds] = useState<string[]>([])

  return (
    <div onClick={() => setIsOpen(!isOpen)} className={`${isOpen && 'border-b-0 rounded-b-none'} border-[#1d2537] w-1/6 relative select-none cursor-pointer text-[#9aa1ad] border rounded flex items-center p-2`}>
      {selected || text || 'Zvolit'}
      <span className="material-icons ml-auto">
        expand_more
      </span>
      <div className={`absolute ${!isOpen && 'hidden'} top-full border-x rounded-b border-x-[#1d2537] border-b-[#1d2537] border-b left-[0] right-[0] bg-[#161718] text-[#9aa1ad] flex flex-col gap-2 p-2`}>
        {items?.map((item, index) => (
          <div key={index} onClick={() => {
            if (selected == item || selecteds.includes(item)) {
              setSelected('')
            } else {
              setSelected(item)
              if (onSelect) onSelect(item)
            }
          }} className={`hover:bg-[#1d2537] hover:text-white cursor-pointer rounded flex items-center p-2 ${selected == item && 'text-white'}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}