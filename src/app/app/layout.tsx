import { getServerSession } from "next-auth";
import { authconfig } from "../api/auth/[...nextauth]/route";
import AppLay from "@/components/alt/applayout";

export default async function AppLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authconfig)
  const signOut = async () => {
    await signOut()
  }

  return <AppLay children={children} session={session} />
}
