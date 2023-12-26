import { ReactNode } from "react";

interface NavbarProps {
    children: ReactNode
}

export default function Navbar({children}: NavbarProps) {
  return (
    <nav className={'gap-4 px-[20px] flex border-b-[#1d2537] border-b h-[70px]'}>
      {children}
    </nav>
  )
}