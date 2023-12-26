import Button from "@/components/button";
import Navbar from "@/components/navbar";
import NavItem from "@/components/navitem";
import Reversed from "@/components/reversed";
import Link from "next/link";

export default function About() {
  return (
    <div
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"
      }
    >
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
      </div>
    </div>
  );
}
