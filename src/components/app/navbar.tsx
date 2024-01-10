import 'material-icons/iconfont/material-icons.css'

import { ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {

  return (
    <nav className={'flex border-[#313537] my-2 ml-2 border rounded-lg flex-col w-[15%]'}>
      <div className={'flex justify-center flex-col items-center my-4'}>
        <h1 className={'text-2xl font-semibold'}>MyEdu</h1>
        <h2>verze 0.0.1</h2>
      </div>
      {children}
    </nav>
  );
}
