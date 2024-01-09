import { getServerSession } from "next-auth";
import { config } from "../api/auth/[...nextauth]/route";
import AppLay from "@/components/alt/applayout";

export default async function AppLayout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(config)
  const signOut = async () => {
    await signOut()
  }

  return <AppLay children={children} session={session} />
}
