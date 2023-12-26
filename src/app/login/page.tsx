import Button from "@/components/button";
import TextInput from "@/components/textinput";
import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <main
      className={
        "text-white overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"
      }>
      <main className={'login-bg w-full h-full flex justify-center items-center'}>
        <form className={'flex flex-col gap-2 w-1/5 h-1/3 bg-[#181a1f] shadow-xl border border-[#1d2537] rounded *:ml-4 *:mr-4'}>
          <h1 className={'font-bold text-2xl mt-4'}>Přihlášení</h1>
          <TextInput className={'w-[90%]'} placeholder="Škola" />
          <TextInput className={'w-[90%]'} placeholder="Identita" />
          <TextInput className={'w-[90%]'} placeholder="Heslo" />
          <Button className={'bg-[#0066ff] w-[90%] mb-4 mt-auto border-[0]'} href='/dashboard'>Pokračovat</Button>
        </form>
      </main>
    </main>
  );
}
