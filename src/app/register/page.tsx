"use client"

import ActionButton from "@/components/actionbutton";
import TextInput from "@/components/textinput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Register() {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    prisma.student.create({
      data: {
        name: "",
        email: "",
        password: "",
        birthday: "",
        classes: {},
        subjects: {},
        grades: {},
        school: {}
      }
    })
  };

  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"
      }>
      <main className={'login-bg w-full h-full flex justify-center items-center'}>
        <form className={'flex flex-col gap-2 w-1/5 h-1/3 bg-[#181a1f] shadow-xl border border-[#1d2537] rounded *:ml-4 *:mr-4'}>
          <h1 className={'font-bold text-2xl mt-4'}>Přihlášení</h1>
          <TextInput onChange={(e) => setIdentity(e.target.value)} name="identity" className={'w-[90%]'} placeholder="Identita" />
          <TextInput type='password' onChange={(e) => setPassword(e.target.value)} name="password" className={'w-[90%]'} placeholder="Heslo" />
          <div className={'mb-4 mt-auto flex flex-col gap-2'}>
            <Link href="/" className={'text-[#0066ff]'}>Domů</Link>
            <ActionButton onClick={handleSignIn} className={'bg-[#0066ff] border-[0] w-full'}>Pokračovat</ActionButton>
          </div>
        </form>
      </main>
    </main>
  );
}