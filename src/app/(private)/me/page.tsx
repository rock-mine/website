import Head from "next/head";
import Image from "next/image";
import { auth, signIn } from "@/utils/auth";
import UserState from "@/components/UserState";
import type { Metadata } from "next";
import Button from "@/components/Button";
import { Bell, Bookmark, Heart, UploadCloud } from "lucide-react";

export const metadata: Metadata = {
  title: "Your profile",
  icons: "/logo.jpg",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user)
    return (
      <div>
        <form
          action={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          <div className="h-full w-full fixed grid place-items-center text-center space-y-8">
            <div className="grid items-center gap-4">
              <span className="border-bluehover border-4 bg-black/20 rounded-md p-2 ">
                <div className="flex items-center gap-2 mx-auto">
                  <Image
                    width={100}
                    height={100}
                    alt="Banner"
                    src="/logo.jpg"
                    className="rounded-full"
                  />
                  <h1 className="font-bold text-2xl antialiased">Rock Mine</h1>
                </div>
                <div>
                  <span className="flex items-center gap-1">
                    <UploadCloud className="w-5 h-5 text-green-500" /> Publique
                    seus próprios addons - Compartilhe suas criações com a
                    comunidade.
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-5 h-5 text-red-500" />
                    Curta e comente conteúdos - Interaja com outros jogadores e
                    criadores.
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark className="w-5 h-5 text-blue-500" />
                    Crie sua coleção favorita - Salve addons para baixar depois.
                  </span>
                  <span className="flex items-center gap-1">
                    <Bell className="w-5 h-5 text-yellow-500" />
                    Receba notificações de novidades - Fique por dentro dos
                    novos lançamentos.
                  </span>
                </div>
              </span>
              <Button type="submit" className="gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
                </svg>
                Login
              </Button>
            </div>
          </div>
        </form>
      </div>
    );

  return (
    <main className=" w-full relative mt-14">
      <Head>
        <title>Your profile</title>
        <link rel="icon" href="/logo.jpg" type="image/x-icon" />
      </Head>
      <div className="bg-[#0b090e] relative w-full">
        <Image
          height={3000}
          width={3000}
          priority
          alt="banner"
          src="/banner.png"
          className="aspect-3/2 object-cover h-[240px] w-full"
        />

        <span className="flex space-x-6 relative -top-20 w-full">
          <Image
            className="object-cover h-[140px] w-[140px] ml-4 rounded-full"
            width={340}
            height={340}
            alt="avatar"
            src={session?.user?.image as string}
          />
          <UserState session={session} />
        </span>
      </div>
    </main>
  );
}
