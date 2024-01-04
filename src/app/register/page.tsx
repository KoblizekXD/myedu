"use client";

import ActionButton from "@/components/actionbutton";
import TextInput from "@/components/textinput";
import TopError from "@/components/toperror";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { URLSearchParams } from "url";

export default function Register() {
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  const handleRegistrationCheck = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await fetch(`/api/school?domain=${domain}`, {
        method: 'GET'
      });
      console.log(res.status)
      if (res.status == 200) {
        setError("Doména je již registrována!");
      } else {
        setError("Yes!");
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
        <form
          onSubmit={handleRegistrationCheck}
          className={
            "flex flex-col gap-2 w-1/5 h-1/2 bg-[#181a1f] shadow-xl border border-[#1d2537] rounded *:ml-4 *:mr-4"
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
              setEmail(e.target.value);
              if (e.target.value.length > 0) {
                setCanSubmit(false);
              } else setCanSubmit(true);
            }}
            name="email"
            placeholder="E-mail hlavního správce"
          />
          <p className={"text-center"}>
            Na e-mail Vám zašleme potvrzovací zprávu, poté budete moct
            pokračovat ve vytváření profilu vaší školy.
          </p>
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
