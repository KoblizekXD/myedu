"use client"

import ActionButton from "@/components/actionbutton";
import TextInput from "@/components/textinput";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [school, setSchool] = useState('');
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signIn('credentials', {
      identity,
      school,
      password,
    });
  };

  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"
      }>
      <main className={'login-bg w-full h-full flex justify-center items-center'}>
        <form className={'flex flex-col gap-2 w-1/5 h-1/3 bg-[#181a1f] shadow-xl border border-[#1d2537] rounded *:ml-4 *:mr-4'}>
          <h1 className={'font-bold text-2xl mt-4'}>Přihlášení</h1>
          <TextInput onChange={(e) => setSchool(e.target.value)} name="school" className={'w-[90%]'} placeholder="Škola" />
          <TextInput onChange={(e) => setIdentity(e.target.value)} name="identity" className={'w-[90%]'} placeholder="Identita" />
          <TextInput onChange={(e) => setPassword(e.target.value)} name="password" className={'w-[90%]'} placeholder="Heslo" />
          <ActionButton onClick={handleSignIn} className={'bg-[#0066ff] w-[90%] mb-4 mt-auto border-[0]'} href='/dashboard'>Pokračovat</ActionButton>
        </form>
      </main>
    </main>
  );
}
