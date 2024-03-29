"use client";

import TextInput from "@/components/textinput";
import TopError from "@/components/toperror";
import TopInfo from "@/components/topinfo";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LogIn() {
  const router = useRouter();

  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const handleSignIn = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await signIn("credentials", {
        identity,
        password,
        redirect: false,
      });
      if (res == null || !res.ok) {
        setError("Špatné přihlašovací údaje");
      } else {
        setError("");
        setInfo("Přihlášení proběhlo úspěšně");
        router.push("/app");
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
        className={"login-bg w-full h-full flex justify-center items-center"}
      >
        {error != "" ? <TopError error={error} /> : null}
        {info != "" ? <TopInfo message={info} /> : null}
        <form
          onSubmit={(e) => handleSignIn(e)}
          className={
            "flex flex-col gap-2 w-1/5 h-1/3 bg-[#181a1f] shadow-xl border border-[#1d2537] rounded *:ml-4 *:mr-4"
          }
        >
          <h1 className={"font-bold text-2xl mt-4"}>Přihlášení</h1>
          <TextInput
            onChange={(e) => setIdentity(e.target.value)}
            name="identity"
            className={"px-[5%]"}
            placeholder="Identita"
          />
          <TextInput
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            className={"px-[5%]"}
            placeholder="Heslo"
          />
          <div className={"mb-4 mt-auto flex flex-col gap-2"}>
            <Link href="/" className={"text-[#0066ff]"}>
              Domů
            </Link>
            <button
              disabled={loading}
              type="submit"
              className={`disabled:opacity-50 bg-[#0066ff] border-[0] w-full rounded text-white text-center py-3 px-3`}
            >
              {loading ? "Načítání..." : "Přihlásit se"}
            </button>
          </div>
        </form>
      </main>
    </main>
  );
}
