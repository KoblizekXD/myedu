'use client'

import 'material-icons/iconfont/material-icons.css'
import TextInput from '../textinput';
import Button from '../button';

type classes = ({
  headTeacher: {
    userId: string;
    schoolId: string;
    user: {
      id: string;
      name: string;
      email: string;
      password: string;
      createdAt: Date;
      updatedAt: Date;
    }
  };
} & {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  schoolId: string;
  teacherId: string;
})[] | null

function ClassListing({classes}: {classes: classes}) {
  const test: classes = [
    {
      headTeacher: {
        userId: '1',
        schoolId: '1',
        user: {
          id: '1',
          name: 'Jan Novák',
          email: '',
          password: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      },
      id: 1,
      name: '1.A',
      createdAt: new Date(),
      updatedAt: new Date(),
      schoolId: '1',
      teacherId: '1'
    },
  ]

  if (classes) { // PLEASE REMAKE THIS TO TABLE
    return (
      <>
        <div className={'border-b-[#313537] select-none px-2 flex border-b py-4'}>
          <h3 className={'text-xl font-semibold'}>Třída</h3>
          <h3 className={'text-xl font-semibold ml-auto mr-[50%]'}>Třídní Učitel</h3>
        </div>
        <div className={'w-full'}>
        {
          test.map((c) => {
            return (
              <div key={c.id} className={'border-b-[#313537] select-none cursor-pointer hover:rounded-md hover:bg-[#2d3032] px-2 flex border-b py-4'}>
                <h3 className={'text-xl font-semibold'}>{c.name}</h3>
                <h3 className={'text-xl ml-auto mr-[50%] font-semibold'}>{c.headTeacher.user.name}</h3>
                <span className='material-icons ml-auto'>
                  chevron_right
                </span>
              </div>
            )
          })
        }
      </div>
      </>
    )
  } else {
    return (
      <h1>Žádné třídy nebyly nalezeny</h1>
    )
  }
}

export default function ClientClassesPage({session, classes}: {session: any, classes: classes}) {
  return (
    <main className={'mx-6 my-6 flex flex-col w-full'}>
      <h1 className={'font-extrabold text-4xl'}>Třídy</h1>
      <p>
        Seznam, umožňující úpravu a náhled jednotlivých tříd
      </p>
      <div className={'flex grow'}>
        <div className={'border-r mt-6 border-r-[#313537] pr-6 flex flex-col gap-4 w-[20%]'}> {/*Toolkit*/}
          <h2 className={'font-bold text-2xl'}>Nástroje</h2>
          <TextInput placeholder={'Vyhledat třídu'} name='search' />
          <Button className={'w-full bg-blue-600 border-0'} href='/app/admin/classes/new'>Nová třída</Button>
        </div>
        <div className={'mt-6 flex flex-col grow ml-6'}>
          <h2 className={'font-bold text-2xl'}>Seznam</h2>
          <div className="grow h-full">
            <ClassListing classes={classes} />
          </div>
        </div>
      </div>
    </main>
  )
}