import Button from "@/components/button";
import Navbar from "@/components/navbar";
import NavItem from "@/components/navitem";
import Reversed from "@/components/reversed";

export default function Home() {
  // #09203F
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
        <Reversed direction="l">
          <NavItem href="/login">Přihlásit se</NavItem>
          <NavItem href="/register">Registrovat školu</NavItem>
        </Reversed>
      </Navbar>
      <div className={"text-center mt-[20vh] flex flex-col gap-4"}>
        <p className={"font-extrabold text-4xl"}>Ano, serou nás Bakaláři</p>
        <p className={"font-extrabold text-2xl"}>
          Společně ale můžeme vytvořit silnout alternativu
        </p>
        <div className={"mt-7 flex justify-center gap-3"}>
          <Button href="/login">Už mám účet!</Button>
          <Button href="/register">Hledám řešení pro naší školu</Button>
        </div>
      </div>
      <div className={"flex text-center mt-[20vh] mb-[20vh]"}>
        <div className={"flex-[50%]"}>
          <h1 className={"text-3xl"}>
            <b>Kdo Jsme? 🚀</b>
          </h1>
          <br></br>
          <ol className={"list-disc list-inside"}>
            <li>Je mi 16 let a tento projekt vznikl záminkou pro SOČ</li>
            <li>Fr nevim co sem data :aware:</li>
          </ol>
        </div>
        <div className={"flex-[50%]"}>
          <h1 className={"text-3xl"}>
            <b>Proč my? 🚀</b>
          </h1>
          <br></br>
          <ol className={"list-disc list-inside"}>
            <li>
              <b>Větší stabilita</b>
              <br></br>
              <p className={"block"}>
                MyEdu klade důraz na stabilitu a spolehlivost, což nás odlišuje
                od konkurence, <br></br>
                kde může docházet k výpadkům.
              </p>
            </li>
            <li>
              <b>Nenutnost hostování</b>
              <p className={"block"}>
                Celý server je hostován u nás, takže se nemusíte o nic starat,
                <br></br>
                stačí vytvořit účet pro školu a nakonfigurovat systém.
              </p>
            </li>
            <li>
              <b>Moderní prostředí</b>
              <p className={"block"}>
                Používáme moderní framework, takže toto bude urcite supr ze
              </p>
            </li>
            <li>
              <b>Open Source</b>
              <p className={"block"}>
                Celý software je dostupný na GitHubu, takže si ho může kdokoliv
                shlédnout,<br></br>
                bez toho aby však někomu viděl na data.
              </p>
            </li>
            <li>
              <b>Open Source</b>
              <p className={"block"}>
                Celý software je dostupný na GitHubu, takže si ho může kdokoliv
                shlédnout,<br></br>
                bez toho aby však někomu viděl na data.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
