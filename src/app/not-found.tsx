import Button from "@/components/button";
import { fetchSession } from "@/util/util";

export default async function NotFound() {
  const session = await fetchSession()
  const logged = session !== null

  return (
    <main className={"text-white flex justify-center items-center overflow-auto w-full h-full fixed bg-gradient-to-b to-[#09203F] from-[#181a1f]"}>
      <div className={'flex flex-col gap-6 items-center'}>
        <h1 className={'text-7xl font-bold text-center'}>404</h1>
        <p className={'text-3xl text-center font-semibold'}>
          Hmm, tady nic není. <br />
          <p className="text-2xl">Tato stránka nebyla nalezena.</p>
        </p>
        <div className={'flex gap-8'}>
          <Button className={'px-4 bg-violet-600 border-0'} href="/">Domů</Button>
          {
            logged && <Button className={'px-4 bg-blue-600 border-0'} href="/app/home">Do Aplikace</Button>
          }
        </div>
      </div>
    </main>
  );
}
