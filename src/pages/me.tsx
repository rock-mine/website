import Head from "next/head";
import Image from "next/image";
import Button from "@/components/Button";
import { Bell, Bookmark, Heart, UploadCloud } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { user } from "@/utils/db";
import Link from "next/link";
export default function Page() {
  const { data: session } = useSession();
  const [displayName, setDisplayName] = useState<string>(
    session?.user?.display_name as string
  );
  const [bio, setBio] = useState<string>(session?.user?.bio as string);

  if (!session?.user)
    return (
      <div>
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
                  Receba notificações de novidades - Fique por dentro dos novos
                  lançamentos.
                </span>
              </div>
            </span>
            <Button onClick={() => signIn("discord")} className="gap-2">
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
          <div className="relative w-full h-full">
            <div className="w-full">
              <div className="grid justify-items-start w-full">
                <input
                  className="text-[40px] outline-none relative w-[500px] sm:w-[450px]"
                  defaultValue={session?.user?.display_name}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <h1 className="text-[17px] text-zinc-500">
                  @{session?.user?.name?.toLowerCase()}
                </h1>
              </div>
              {session?.user.role != "" && (
                <div className="flex items-center space-x-2">
                  <h1>Roles: </h1>
                  {session?.user.role?.split(", ").map((role, i) => (
                    <div
                      key={i}
                      data-tooltip={`${role[0].toUpperCase() + role.slice(1)}`}
                      className={`relative whitespace-nowrap w-fit h-fit after:content-[attr(data-tooltip)] after:absolute after:left-2/4 after:translate-x-[-50%]
                          after:bottom-[100%]
                          after:text-[13px]
                                            after:rounded-lg after:text-white after:invisible hover:after:visible`}
                    >
                      <Image
                        width={20}
                        height={20}
                        alt="roles"
                        src={`/roles/${role}.png`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="absolute top-30 -left-10 max-w md:relative md:mx-auto md:top-2 md:h-[200px] rounded-md bg-[#0e0d11] md:w-[90%] border-2 border-white/20">
              <textarea
                className="resize-none outline-none w-full h-full p-4"
                defaultValue={session?.user?.bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="relative flex mt-30 -left-[20%] md:mt-5 space-x-8 w-full md:left-0 md:w-[800px]">
              <button
                className="text-gray-300 hover:text-bluetext bg-bluebg transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md border-2 border-blueborder"
                onClick={() => signOut()}
                type="submit"
              >
                Log Out
              </button>
              <button
                className="text-gray-300 hover:text-bluetext bg-bluebg transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md border-2 border-blueborder"
                onClick={() => {
                  user.updateUser(session?.user?.id as string, {
                    bio,
                    display_name: displayName,
                  });
                }}
              >
                Save changes
              </button>
              <Link
                href="/addproject"
                className="text-gray-300 hover:text-bluetext bg-bluebg transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md border-2 border-blueborder"
              >
                Create Project +
              </Link>
              <div className="flex-shrink-0"></div>
            </div>
          </div>
        </span>
      </div>
    </main>
  );
}
