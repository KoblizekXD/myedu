'use client'

import Navbar from "@/components/app/navbar";
import NavItem from "@/components/app/navitem";
import { usePathname } from "next/navigation";

export default function AppLayout({children}: {children: React.ReactNode}) {
  const pathname = usePathname();
  const select = (path: string) => {
    if (path == pathname) return true;
    else return false;
  }

  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-[#161718] flex flex-row"
      }
    >
      <Navbar>
        <NavItem href="/app/home" icon="home" selected={select('/app/home')}>
          Domů
        </NavItem>
        <NavItem href="/app/timetable" selected={select('/app/timetable')} icon="view_list" materialClass="material-symbols-outlined">
          Rozvrh
        </NavItem>
        <NavItem href="/app/grading" icon="checklist" selected={select('/app/grading')}>
          Známky
        </NavItem>
        <NavItem href="/app/absence" icon="person" selected={select('/app/absence')}>
          Absence
        </NavItem>
        <NavItem href="/app/stream" icon="description" selected={select('/app/stream')}>
          Soubory
        </NavItem>
        <div className="mt-auto">
          <NavItem href="/app/options" icon="settings" selected={select('/app/options')}>
            Nastavení
          </NavItem>
        </div>
      </Navbar>
      {children}
    </main>
  );
}
