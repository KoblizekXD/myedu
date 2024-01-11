"use client";

import Navbar from "@/components/app/navbar";
import NavItem from "@/components/app/navitem";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Separator from "../app/separator";

interface LayoutProps {
  session: any;
  children: React.ReactNode;
}

function AdminOnlyFields() {
  return (
    <>
      <Separator />
      <NavItem href="/app/admin" icon="admin_panel_settings">
        Nastavení Administrátora
      </NavItem>
    </>
  )
}

export default function AppLay({session, children} : LayoutProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  const select = (path: string) => {
    if (path == pathname) return true;
    else return false;
  };

  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-[#161718] flex flex-row"
      }
    >
      <Navbar>
        <NavItem href="/app/home" icon="home" selected={select("/app/home")}>
          Domů
        </NavItem>
        <NavItem
          href="/app/timetable"
          selected={select("/app/timetable")}
          icon="view_list"
          materialClass="material-symbols-outlined"
        >
          Rozvrh
        </NavItem>
        <NavItem
          href="/app/grading"
          icon="checklist"
          selected={select("/app/grading")}
        >
          Známky
        </NavItem>
        <NavItem
          href="/app/absence"
          icon="person"
          selected={select("/app/absence")}
        >
          Absence
        </NavItem>
        <NavItem
          href="/app/stream"
          icon="description"
          selected={select("/app/stream")}
        >
          Soubory
        </NavItem>
        {session.user.admin && <AdminOnlyFields />}
        <div className="mt-auto">
          {profileOpen && (
            <div className="rounded w-[200px] bg-[#161718] absolute border zobak border-[#313537]">
              <NavItem onClick={() =>
                signOut({ callbackUrl: '/login'})
                } icon="power_settings_new">Odhlásit se</NavItem>
              <NavItem href="/app/account" icon="account_circle">Účet</NavItem>
            </div>
          )}
          <NavItem
            onClick={() => setProfileOpen(!profileOpen)}
            icon="person"
            selected={select("/app/profile")}
            >{session.user.name}</NavItem>
          <NavItem
            href="/app/options"
            icon="settings"
            selected={select("/app/options")}
          >
            Nastavení
          </NavItem>
        </div>
      </Navbar>
      {children}
    </main>
  );
}
