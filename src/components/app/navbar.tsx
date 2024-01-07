import 'material-icons/iconfont/material-icons.css'

import { ReactNode } from "react";
import NavItem from "./navitem";

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <nav className={'flex border-r flex-col w-1/12'}>
      <NavItem href="xd" icon='home' selected>Domů</NavItem>
      {children}
    </nav>
  );
}
