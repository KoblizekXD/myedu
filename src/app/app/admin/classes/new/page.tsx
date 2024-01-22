import NewClass from "@/components/alt/newclass";
import { checkPermissions, fetchSession } from "@/util/util";
import "material-icons/iconfont/material-icons.css";
import { redirect } from "next/navigation";
import { headers } from 'next/headers'

export default async function CreateClass() {
  const session = await fetchSession()
  if (!checkPermissions('admin', session)) {
    redirect('/app/home?error=unauthorized')
  }

  const body = await (await fetch(process.env.NEXTAUTH_URL + '/api/school/teacher', {method: 'GET', headers: new Headers(headers())})).json()
 
  return <NewClass teacherMap={new Map([
    ["wdawf", "a"], ["awdkjeaswhdfueisahdf", "b"]
  ])} />
}