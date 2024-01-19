import 'material-icons/iconfont/material-icons.css'

import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {

  return (
    <nav className={'flex border-[#313537] border-r flex-col w-[15%]'}>
      <div className={'flex justify-center flex-col items-center my-4'}>
        <h1 className={'text-2xl font-bold'}>My Edu</h1>
        <h2>verze 0.0.1</h2>
      </div>
      {children}
    </nav>
  );
}
