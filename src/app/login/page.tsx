import LogIn from "@/components/alt/login";
import { fetchSession } from "@/util/util";
import { useRouter } from "next/navigation";

export default async function Login() {
  const session = await fetchSession() != null

  return (
    <LogIn red={session} />
  );
}
