"use client";

import "material-icons/iconfont/material-icons.css";
import TextInput from "../textinput";
import Button from "../button";
import { FormEvent, useEffect, useState } from "react";
import { $Enums } from "@prisma/client";

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

function ClassListing({ teachers }: { teachers: teachers }) {
  if (teachers) {
    // PLEASE REMAKE THIS TO TABLE
    return (
      <>
        <div className={"w-full"}>
          {teachers.map((c) => {
            return (
              <div
                key={c.user.id}
                className={
                  "border-b-[#313537] select-none cursor-pointer hover:rounded-md hover:bg-[#2d3032] px-2 flex border-b py-4"
                }
              >
                <h3 className={"text-xl font-semibold"}>{c.user.name}</h3>
                <h3
                  className={
                    "text-xl text-center w-full self-center font-semibold"
                  }
                >
                  {c.user.name}
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

export default function ClientTeachersPage({
  session,
  teachers,
}: {
  session: any;
  teachers: teachers;
}) {
  const [cls, setCls] = useState<teachers>(teachers);
  const onTextChange = (e: any) => {
    const filtered = teachers?.filter((c) => {
      return c.user.name.includes(e.target.value);
    });
    if (filtered) {
      setCls(filtered);
    } else setCls([]);
  };

  return (
    <main className={"mx-6 my-6 flex flex-col w-full"}>
      <h1 className={"font-extrabold text-4xl"}>Učitelé</h1>
      <p>Seznam, umožňující úpravu a náhled jednotlivých učitelů</p>
      <div className={"flex grow"}>
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
            <ClassListing teachers={cls} />
          </div>
        </div>
      </div>
    </main>
  );
}
