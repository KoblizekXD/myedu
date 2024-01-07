"use client"

import ActionButton from "@/components/actionbutton";
import Button from "@/components/button";
import TextInput from "@/components/textinput";
import TopError from "@/components/toperror";
import TopInfo from "@/components/topinfo";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

function translateError(error: string | null) {
  if (error == null) return ""
  switch (error) {
    case "Configuration":
      return "Chyba konfigurace server, pokud problém přetrvává, kontaktujte podporu"
    case "AccessDenied":
      return "Vypadá tom, že k obsahu nemáte přístup"
    default:
      return "Nevím, pokud problém přetrvává a brání v užívání, kontaktujte nás"
  }
}

export default function Error() {
  const router = useRouter()
  const params = useSearchParams()
  const error = params.get('error')
  if (error == null) {
    router.push('/')
  }
  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"
      }>
      <main className={'login-bg w-full h-full flex justify-center'}>
        <div className={'flex flex-col gap-4 w-1/2 h-1/2 rounded *:ml-4 mt-32 *:mr-4 justify-center'}>
          <h1 className={'text-center text-3xl font-extrabold mt-16'}>Chyba!</h1>
          <h2 className={'text-center text-xl font-bold'}>Nastala neočekávaná chyba</h2>
          <p className={'text-center text-4xl font-extrabold text-red-500'}>{translateError(error)}</p>
          <Button href="/" className={'bg-blue-400 border-[0] mt-auto mb-16 self-center'}>
            Zpět domů
          </Button>
        </div>
      </main>
    </main>
  );
}
