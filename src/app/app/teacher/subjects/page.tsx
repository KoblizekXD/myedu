import ClientSubjects from "@/components/alt/clientsubjects";
import { fetchSession } from "@/util/util";

export default async function Subjects() {
  const session = await fetchSession()

  return <ClientSubjects session={session} />
}