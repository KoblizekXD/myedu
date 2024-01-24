import NewClass from "@/components/alt/newclass";
import { checkPermissions, fetchSession } from "@/util/util";
import "material-icons/iconfont/material-icons.css";
import { redirect } from "next/navigation";
import NewTeacher from "@/components/alt/newteacher";
import { headers } from "next/headers";

export default function CreateClass() {
//   const session = await fetchSession()
//   if (!checkPermissions('admin', session)) {
//     redirect('/app/home?error=unauthorized')
//   }
 
  return <NewTeacher header={headers()} />
}