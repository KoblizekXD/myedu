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
          Tyto nastavení se aplikují pro celou školu globálně.
        </h2>
      </main>
    )
  }
}