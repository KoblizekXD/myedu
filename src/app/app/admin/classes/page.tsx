import { checkPermissions, fetchSession } from "@/util/util"
import { redirect } from "next/navigation"
import { getSchoolId } from "../school/page"
import ClientClassesPage from "@/components/alt/clientclasses"

export default async function Classes() {
  const session = await fetchSession()
  if (!checkPermissions('admin', session)) {
    redirect('/app/home?error=unauthorized')
  } else {
    const school = await prisma.school.findUnique({
      where: {
        id: getSchoolId(session?.user)
      }
    }).classes({
      include: {
        headTeacher: {
          include: {
            user: true
          }
        }
      }
    })
    return <ClientClassesPage session={session} classes={school} />
  }
}