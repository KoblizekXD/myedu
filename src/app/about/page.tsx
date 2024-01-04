import Button from "@/components/button";
import Navbar from "@/components/navbar";
import NavItem from "@/components/navitem";
import Reversed from "@/components/reversed";
import Link from "next/link";

export default function About() {
  return (
    <div
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f] pb-20"
      }
    >
      <div className="about-anim">
      📓
      </div>
      <Navbar>
        <NavItem href="/">Domů</NavItem>
        <NavItem href="/about">O Projektu</NavItem>
        <NavItem href="/docs">Dokumentace</NavItem>
        <Reversed>
          <NavItem href="/login">Přihlásit se</NavItem>
          <NavItem href="/register">Registrovat školu</NavItem>
        </Reversed>
      </Navbar>
      <div className={"flex flex-col gap-[6rem]"}>
        <div className={"text-center mt-[20vh] flex flex-col gap-4"}>
          <p className={"font-extrabold text-6xl"}>O Projektu</p>
        </div>
        <div className={"ml-[20%] flex flex-col gap-2"}>
          <h2 className={"text-4xl font-semibold"}>Motivace 🧑🏻‍🏫</h2>
          <p className={"text-2xl ml-5 w-[50vw]"}>
            Naším úkolem je vytvořit centralizovanou konkurenci pro dnešní
            školní systémy se kterými mají jak učitelé tak žáci, či rodiče často
            problémy. Použitím moderních technologií lze všem též usnadnit
            práci(např. zlepšení orientace v systému). Projekt byl také vytvořen
            pro
            <Link href="https://www.soc.cz/" className={"text-blue-600"}>
              {" "}
              SOČ
            </Link>
            .
          </p>
        </div>
        <div className={"ml-[20%] flex flex-col gap-2"}>
          <h2 className={"text-4xl font-semibold"}>Funkce 📏</h2>
          <p className={"text-2xl ml-5 w-[50vw]"}>
            Projekt je navržen tak, aby svými funkcemi mohl plně nahradit součásné vedoucí školní systémy, 
            věci jako moodle či učebna jsou tedy integrovány do jednoho systému. Mezi význámné funkce patří například:
          </p>
          <ul className="list-disc text-2xl ml-16 w-[50vw]">
            <li>
              Centralizované prostředí o které se nemusíte starat, aktualizace jsou prováděny automaticky.
            </li>
            <li>
              Moderní a přehledné prostředí, což ocení všechny věkové skupiny.
            </li>
            <li>
              Sdílení materiálů na jednom místě bez nutnosti používat externí služby.
            </li>
            <li>
              Upravitelnost vzhledu a funkcí podle potřeb dané školy.
            </li>
          </ul>
        </div>
        <div className={"ml-[20%] flex flex-col gap-2"}>
          <h2 className={"text-4xl font-semibold"}>Technické specifikace a informace 🖥️</h2>
          <p className={"text-2xl ml-5 w-[50vw]"}>
            Tyto informace slouží hlavně pro správce a technické pracovníky.
          </p>
          <ul className="list-disc text-2xl ml-16 w-[50vw]">
            <li>
              Projekt je postaven na moderním frameworku Next.js a Tailwindem a jeho zdrojový kód je dostupný na
              <Link className={'text-blue-600'} href="https://www.github.com/KoblizekXD/myedu"> Githubu</Link>.
            </li>
            <li>
              Pro nejrychlejší hlášení chyb a problémů využijte Github, pokud to není možné, kontaktujte nás na
              <Link className={'text-blue-600'} href="mailto:example@example.com"> e-mailu</Link>.
            </li>
            <li>
              Databáze běží na PostgreSQL a je hostována na vlastním serveru a je periodicky zálohována.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
