import Button from "@/components/button";
import Navbar from "@/components/navbar";
import NavItem from "@/components/navitem";
import Reversed from "@/components/reversed";
import { fetchSession } from "@/util/util";

export default async function Home() {
  const session = await fetchSession();

  let change;
  if (session) {
    change = true;
  } else change = false;

  // #09203F
  return (
    <div
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"
      }
    >
      <div className="main-menu w-full h-full">
        <Navbar>
          <NavItem href="/">Domů</NavItem>
          <NavItem href="/about">O Projektu</NavItem>
          <NavItem href="/docs">Dokumentace</NavItem>
          <Reversed direction="l">
            {change ?
              <NavItem href="/app">Pokračovat do aplikace</NavItem> : (
                <>
                  <NavItem href="/login">Přihlásit se</NavItem>
                  <NavItem href="/register">Registrovat školu</NavItem>
                </>
              )
            }
          </Reversed>
        </Navbar>
        <div className={"text-center mt-[30vh] flex flex-col gap-4"}>
          <p className={"font-extrabold text-4xl"}>Ano, serou nás Bakaláři</p>
          <p className={"font-extrabold text-2xl"}>
            Společně ale můžeme vytvořit silnout alternativu
          </p>{" "}
          <div className={"mt-7 flex justify-center gap-3"}>
            {change ? (
              <div className="flex justify-center items-center flex-col gap-3 text-l">
                <h2>Protože jste již přihlášeni, můžeme vás rovnou přesměrovat!</h2>
                <Button href="/app">Přejít do aplikace</Button>
              </div>
            ) : (
              <div>
                <Button href="/login">Už mám účet!</Button>
                <Button href="/register">Hledám řešení pro naší školu</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
