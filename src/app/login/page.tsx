import LogIn from "@/components/alt/login";
import { fetchSession } from "@/util/util";
import { redirect, useRouter } from "next/navigation";

export default async function Login() {
  const session = await fetchSession()

  if (session) {
    redirect('/app')
  }

  return (
    <LogIn />
  );
}
