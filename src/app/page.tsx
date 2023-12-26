import Navbar from "@/components/navbar";
import NavItem from "@/components/navitem";
import Reversed from "@/components/reversed";

export default function Home() {
  return (
    <div className={'w-full h-full fixed bg-gradient-to-b to-[#0b0b54] from-[#181a1f]'}>
      <Navbar>
        <NavItem href="/">Domů</NavItem>
        <NavItem href="/about">O Projektu</NavItem>
        <Reversed>
          <NavItem href="/login">Přihlásit se</NavItem>
          <NavItem href="/register">Registrovat školu</NavItem>
        </Reversed>
      </Navbar>
    </div>
  )
}
