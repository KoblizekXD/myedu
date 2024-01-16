import ActionButton from "@/components/actionbutton";
import Button from "@/components/button";
import TextInput from "@/components/textinput";
import { checkPermissions, fetchSession } from "@/util/util";
import { redirect } from "next/navigation";

// Guess who setup the db schema incorrectly? 
export function getSchoolId(user: any) {
  // Me
  if (user.admin) return user.admin.schoolId
  else if (user.teacher) return user.teacher.schoolId
  else if (user.student) return user.student.schoolId
  else return null
}

export default async function Admin() {
  const session = await fetchSession()

  if (!checkPermissions('admin', session)) {
    redirect('/app/home?error=unauthorized')
  } else {
    const school = await prisma.school.findUnique({
      where: {
        id: getSchoolId(session?.user)
      }
    })
    return (
      <main className={'flex flex-col items-center gap-4 grow'}>
        <h1 className={'font-bold text-4xl mt-5'}>Upravit nastavení školy</h1>
        <h2 className={'text-xl mt-5'}>
          Tato nastavení jsou globální pro celou školu.
        </h2>
        <div className={'grow flex justify-center items-center w-full'}>
          <form className={'w-1/2 border flex flex-col gap-2 border-[#1e1e1e] rounded px-4 py-4'}>
            <h2 className={'text-xl ml-px font-semibold'}>Název Školy</h2>
            <TextInput className="w-full" value={school?.name} name="school" placeholder="Nový název"></TextInput>
            <h2 className={'text-xl ml-px font-semibold'}>Doména</h2>
            <TextInput className="w-full" value={school?.domain} name="school" placeholder="Nová doména"></TextInput>
            <h2 className={'text-xl ml-px font-semibold'}>Logo</h2>
            <input className="border rounded text-center border-[#1d2537] p-4" type='file'></input>
            <button
              type="submit"
              className={`disabled:opacity-50 bg-purple-500 border-[0] w-full rounded text-white text-center py-3 px-3`}
            >
              Uložit
            </button>
          </form>
        </div>
      </main>
    )
  }
}