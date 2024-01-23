import { fetchSession } from "@/util/util";
import { getSchoolId } from "../school/page";
import ClientTeachersPage from "@/components/alt/clientteachers";

export default async function TeachersPage() {
  const session = await fetchSession()
  const teachers = await prisma.school.findUnique({
    where: {
      id: getSchoolId(session?.user)
    }
  }).teachers({
    include: {
      user: true
    }
  })
  return <ClientTeachersPage session={session} teachers={teachers} />
}