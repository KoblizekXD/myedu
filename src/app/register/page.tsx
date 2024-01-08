"use client";

import ActionButton from "@/components/actionbutton";
import TextInput from "@/components/textinput";
import TopError from "@/components/toperror";
import TopInfo from "@/components/topinfo";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

function isValidEmail(email: string, domain: string): boolean {
  var re =
    /^(([a-zA-Z0-9]+)|([a-zA-Z0-9]+((?:\_[a-zA-Z0-9]+)|(?:\.[a-zA-Z0-9]+))*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,6}(?:\.[a-zA-Z]{2})?)$)/;
  return re.test(email) && email.split("@").pop() == domain;
}

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [schoolname, setSchoolName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  const handleRegistrationCheck = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (isValidEmail(email, domain)) {
        const res = await fetch(`/api/school?domain=${domain}`, {
          method: "GET",
        });
        console.log(res.status);
        if (res.status == 200) {
          setError("Doména je již registrována!");
        } else {
          const res = await fetch(`/api/school`, {
            method: "POST",
            body: JSON.stringify({
              domain: domain,
              name: schoolname,
              admin: {
                name: name,
                email: email,
                password: password,
              },
            }),
          });
          if (res.ok) {
            setError("")
            setInfo("Registrace proběhla úspěšně! Nyní se můžete přihlásit.");
          } else {
            setError("Něco se pokazilo! Je možné že je vaše doména již registrována.");
          }
        }
      } else {
        setError(
          "Neplatná email adresa! Ujistite se že doména sedí s emailem."
        );
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(String(error));
    }
  };

  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"
      }
    >
      <main
        className={"register-bg w-full h-full flex justify-center items-center"}
      >
        {error && <TopError error={error} />}
        {info && <TopInfo message={info} />}
        <form
          onSubmit={handleRegistrationCheck}
          className={
            "flex flex-col gap-2 w-1/5 bg-[#181a1f] shadow-xl border border-[#1d2537] rounded *:ml-4 *:mr-4"
          }
        >
          <h1 className={"font-bold text-2xl mt-4"}>Registrace Školy</h1>
          <p className={"text-justify"}>
            Děkujeme za zájem o náš systém, mějte prosím na paměti, že aplikace
            je pořád v rané fázi vývoje a může obsahovat chyby. Prosíme vás
            tedy, abyste nám tyto chyby hlásili na GitHubu.
          </p>
          <TextInput
            onChange={(e) => {
              setDomain(e.target.value);
              if (e.target.value.length > 0) {
                setCanSubmit(false);
              } else setCanSubmit(true);
            }}
            name="identity"
            placeholder="Doména školy"
          />
          <TextInput
            onChange={(e) => {
              setSchoolName(e.target.value);
              if (e.target.value.length > 0) {
                setCanSubmit(false);
              } else setCanSubmit(true);
            }}
            name="schoolname"
            placeholder="Jméno školy"
          />
          <TextInput
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value.length > 0) {
                setCanSubmit(false);
              } else setCanSubmit(true);
            }}
            name="email"
            placeholder="E-mail hlavního správce"
          />
          <TextInput
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value.length > 0) {
                setCanSubmit(false);
              } else setCanSubmit(true);
            }}
            name="name"
            placeholder="Jméno správce"
          />
          <TextInput
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              if (e.target.value.length > 0) {
                setCanSubmit(false);
              } else setCanSubmit(true);
            }}
            name="password"
            placeholder="Heslo správce"
          />
          <div className={"mb-4 mt-auto flex flex-col gap-2"}>
            <Link href="/" className={"text-[#0066ff]"}>
              Domů
            </Link>
            <button
              disabled={loading || canSubmit}
              type="submit"
              className={`disabled:opacity-50 bg-[#0066ff] border-[0] w-full rounded text-white text-center py-3 px-3`}
            >
              {loading ? "Načítání..." : "Pokračovat"}
            </button>
          </div>
        </form>
      </main>
    </main>
  );
}
