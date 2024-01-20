import Link from "next/link";
import "material-icons/iconfont/material-icons.css";
import TextInput from "@/components/textinput";
import SelectionBox from "@/components/selectionbox";

export default function NewClass() {
  return (
    <main className={'mx-6 my-6 flex flex-col gap-2 w-full'}>
      <h1 className={'font-extrabold text-4xl'}>Vytvořit novou třídu</h1>
      <Link href={'/app/admin/classes'} className={'text-blue-500 items-center flex text-lg'}>
        <span className="material-icons">
          arrow_back
        </span>
        Zpět
      </Link>
      <div className={'grow flex justify-center'}>
        <form className={'w-full flex gap-4 items-center flex-col'}>
          <h2 className={'text-xl font-semibold'}>Jméno nové třídy</h2>
          <TextInput name="class_name" placeholder='Jméno třídy' className={'w-1/2'} />
          <SelectionBox items={['omg']}>
            Yepasdwdawdwa
          </SelectionBox>
        </form>
      </div>
    </main>
  )
}