import Navbar from "@/components/app/navbar";
import NavItem from "@/components/app/navitem";
import { useParams } from "next/navigation";

export default function AppLayout({children, params}: {children: React.ReactNode, params: {tab: string}}) {
  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-[#161718] flex flex-row"
      }
    >
      <Navbar>
        <NavItem href="/app" icon="home" selected>
          Domů
        </NavItem>
        <NavItem href="/app" icon="view_list" materialClass="material-symbols-outlined">
          Rozvrh
        </NavItem>
        <NavItem href="/app" icon="checklist">
          Známky
        </NavItem>
        <NavItem href="/app" icon="person">
          Absence
        </NavItem>
        <NavItem href="/app" icon="description">
          Soubory
        </NavItem>
        <div className="mt-auto">
          <NavItem href="/app" icon="settings">
            Nastavení
          </NavItem>
        </div>
      </Navbar>
      {children}
    </main>
  );
}
