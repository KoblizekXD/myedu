"use client";

import "material-icons/iconfont/material-icons.css";
import TextInput from "../textinput";
import Button from "../button";
import { FormEvent, useEffect, useState } from "react";
import { $Enums } from "@prisma/client";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import ActionButton from "../actionbutton";
import SelectionBox from "../selectionbox";
import TopInfo from "../topinfo";

// WHY EVEN IS IT SPLIT TO 2 TYPES???
type teachers = ({
  user: {
      id: string;
      email: string;
      name: string;
      password: string;
      type: $Enums.UserType;
      createdAt: Date;
      updatedAt: Date;
  };
} & {
  userId: string;
  schoolId: string;
})[] | null

type teacher = ({
  user: {
      id: string;
      email: string;
      name: string;
      password: string;
      type: $Enums.UserType;
      createdAt: Date;
      updatedAt: Date;
  };
} & {
  userId: string;
  schoolId: string;
}) | undefined

export default function ClientTeachersPage({
  session,
  teachers,
}: {
  session: any;
  teachers: teachers;
}) {
  const [cls, setCls] = useState<teachers>(teachers);
  const [showing, setShowing] = useState<teacher>(undefined);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  
  const router = useRouter();

  function ShowTeacherInfoSubPage({ teacher }: { teacher: teacher }) {
    const [changedName, setChangedName] = useState<string | undefined>(teacher?.user.name);
    const [changedEmail, setChangedEmail] = useState<string | undefined>(teacher?.user.email);
    const [changedPassword, setChangedPassword] = useState<string | undefined>(undefined);
    const [changedType, setType] = useState<$Enums.UserType>(teacher?.user.type || 'Teacher');

    return (
      <div className={'absolute border gap-y-6 border-[#313537] rounded bg-[#161718] flex flex-col h-[90%] w-[40%] self-center p-4'}>
        <div className={'flex text-3xl'}>
          <h1 className={'font-bold text-left'}>Informace o učiteli</h1>
          <span onClick={() => {
            setShowing(undefined)
            setShowEdit(false)
          }} className="material-icons ml-auto text-gray-600 self-center text-3xl font-bold cursor-pointer">
            close
          </span>
        </div>
        <div className={'grow flex flex-col gap-y-2'}>
          <h1 className={'font-bold text-2xl'}>Jméno a Příjmení</h1>
          <h2 className={'text-lg'}>{teacher?.user.name}</h2>
          <h1 className={'font-bold text-2xl'}>Email</h1>
          <h2 className={'text-lg'}>{teacher?.user.email}</h2>
          <h1 className={'font-bold text-2xl'}>Typ Účtu</h1>
          <h2 className={'text-lg'}>{teacher?.user.type == 'Admin' ? 'Administrátor' : 'Učitel'}</h2>
          <ActionButton className={'w-full'} onClick={async () => {
            setShowEdit(!showEdit)
            if (showEdit) {
              console.log('yes')
              const res = await fetch('/api/school/user', {
                method: 'PUT',
                body: JSON.stringify({
                  id: teacher?.user.id,
                  name: changedName,
                  email: changedEmail,
                  password: changedPassword,
                  type: changedType
                })
              })
              if (res.ok) {
                setMessage('Učitel byl úspěšně upraven')
              } else {
                setMessage('Učitel se nepodařilo upravit: ' + await res.text())
              }
            } else {
              setChangedName(teacher?.user.name || '')
              setChangedEmail(teacher?.user.email || '')
              setChangedPassword('')
              setType(teacher?.user.type || 'Teacher')
            }
          }}>
            {showEdit ? 
            <div className={'flex justify-center'}>
              <span className="material-icons mr-2">
                check
              </span>
              Dokončit změnu
            </div> : 'Změnit údaje'}
          </ActionButton>
          {
            showEdit &&
            <>
              <h1 className={'font-bold text-2xl'}>Jméno a Příjmení</h1>
              <TextInput onChange={(e) => setChangedName(e.target.value)} name="" className={'text-lg'} value={teacher?.user.name} />
              <h1 className={'font-bold text-2xl'}>Email</h1>
              <TextInput onChange={(e) => setChangedEmail(e.target.value)} name="" className={'text-lg'} value={teacher?.user.email} />
              <h1 className={'font-bold text-2xl'}>Heslo</h1>
              <TextInput onChange={(e) => setChangedPassword(e.target.value)} name="" className={'text-lg'} placeholder={'Nové heslo'} />
              <h1 className={'font-bold text-2xl'}>Typ Účtu</h1>
              <SelectionBox onSelect={(val) => {
                if (val === 'Učitel') setType('Teacher') 
                else setType('Admin')
              }} text="Typ profilu" items={['Učitel', 'Administrátor']} />
            </>
          }
        </div>
      </div>
    )
  }

  function ClassListing({ teachers, router }: { teachers: teachers, router: AppRouterInstance }) {
    if (teachers) {
      // PLEASE REMAKE THIS TO TABLE
      return (
        <>
          <div className={`w-full`}>
            {teachers.map((c) => {
              return (
                <div
                  onClick={() => {
                    setShowing(teachers.find((t) => t.user.id === c.user.id));
                  }}
                  key={c.user.id}
                  className={
                    "border-b-[#313537] select-none cursor-pointer hover:rounded-md hover:bg-[#2d3032] px-2 flex border-b py-4"
                  }
                >
                  <h3 className={"text-xl font-semibold"}>{c.user.name}</h3>
                  <h3
                    className={
                      "text-xl text-center grow self-center font-semibold"
                    }
                  >
                    {c.user.email}
                  </h3>
                  <span className="material-icons ml-auto">chevron_right</span>
                </div>
              );
            })}
          </div>
        </>
      );
    } else {
      return <h1>Žádní učitelé nenalezeni</h1>;
    }
  }

  const onTextChange = (e: any) => {
    const filtered = teachers?.filter((c) => {
      return c.user.name.includes(e.target.value);
    });
    if (filtered) {
      setCls(filtered);
    } else setCls([]);
  };

  return (
    <main className={`mx-6 my-6 flex flex-col items-stretch w-full`}>
      <div className={`${showing && 'opacity-30 pointer-events-none'} flex h-full flex-col`}>
        <h1 className={"font-extrabold text-4xl"}>Učitelé</h1>
        <p>Seznam, umožňující úpravu a náhled jednotlivých učitelů</p>
        <div className={"flex grow h-full"}>
          <div
            className={
              "border-r mt-6 border-r-[#313537] pr-6 flex flex-col gap-4 w-[20%]"
            }
          >
            {" "}
            {/*Toolkit*/}
            <h2 className={"font-bold text-2xl"}>Nástroje</h2>
            <TextInput
              onChange={(e) => onTextChange(e)}
              placeholder={"Vyhledat učitele"}
              name="search"
            />
            <Button
              className={"w-full bg-blue-600 border-0"}
              href="/app/admin/teachers/new"
            >
              Nový profil učitele
            </Button>
          </div>
          <div className={"mt-6 flex flex-col grow ml-6"}>
            <h2 className={"font-bold text-2xl"}>Seznam</h2>
            <div className="grow h-full w-full">
              <div
                className={
                  "border-b-[#313537] select-none px-2 flex border-b py-4"
                }
              >
                <div className={"text-xl font-semibold"}>Jméno</div>
              </div>
              <ClassListing router={router} teachers={cls} />
            </div>
          </div>
        </div>
      </div>
      {showing && <ShowTeacherInfoSubPage teacher={showing} />}
      {message && <TopInfo message={message} />}
    </main>
  );
}
