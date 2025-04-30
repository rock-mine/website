import Head from "next/head";
import Image from "next/image";
import Button from "@/components/Button";
import { Bell, Bookmark, Heart, Pencil, UploadCloud } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { image, user } from "@/utils/db";
import { useFilePicker } from "use-file-picker";
import type { User } from "types";
export default function Page() {
  const { data: session } = useSession();
  const [data, setData] = useState<User>();

  const { openFilePicker: openFilePickerAvatar, filesContent: fileAvatar } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      validators: [],
    });

  const { openFilePicker: openFilePickerBanner, filesContent: fileBanner } =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      validators: [],
    });

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
    <main className="w-full relative mt-14">
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
          src={
            fileBanner[0]?.content
              ? fileBanner[0]?.content
              : `/api/image/${session?.user?.name}-banner`
          }
          className="aspect-3/2 object-cover h-[240px] w-full"
        />
        <span
          onClick={() => openFilePickerBanner()}
          className="absolute hover:bg-white/30 duration-150 rounded-full p-4 right-4 top-5"
        >
          <Pencil size={32} />
        </span>

        <span className="flex space-x-6 relative -top-20 w-full">
          <div
            onClick={() => openFilePickerAvatar()}
            className="relative h-36 w-36 p-2 bg-[#0b090e] rounded-full ml-4 group"
          >
            <Image
              width={144}
              height={144}
              alt="avatar"
              className="object-cover rounded-full"
              src={
                fileAvatar[0]?.content
                  ? fileAvatar[0]?.content
                  : `/api/image/${session?.user?.name}-avatar`
              }
            />
            <div className="absolute inset-0 bg-[#0b090e]/30 flex items-center justify-center text-white rounded-full opacity-0 group-hover:opacity-100 transition">
              <Pencil size={42} />
            </div>
          </div>
          <div className="relative w-full h-full">
            <div className="w-full">
              <div className="grid justify-items-start w-full">
                <input
                  className="text-[40px] outline-none relative md:w-[500px] w-[150px]"
                  defaultValue={session?.user?.display_name}
                  onChange={(e) =>
                    setData(
                      (baseData) =>
                        ({
                          ...baseData,
                          display_name: e.target.value,
                        } as User)
                    )
                  }
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
                      className={`relative whitespace-nowrap w-fit h-fit after:content-[attr(data-tooltip)] after:absolute after:left-2/4 after:translate-x-[-50%] after:bottom-[100%] after:text-[13px] after:rounded-lg after:text-white after:invisible hover:after:visible`}
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
          </div>
        </span>
            <div className="relative -top-20 w-full h-full">
              <textarea
              className="relative top-0 max-w md:relative md:mx-auto md:top-2 min-h-[160px] md:min-h-[140px] rounded-md bg-[#0e0d11] w-[90%] border-2 border-white/20 resize-none outline-none p-2"
              defaultValue={session?.user?.bio}
              onChange={(e) =>
                setData(
                  (baseData) =>
                    ({
                      ...baseData,
                      bio: e.target.value,
                    } as User)
                  )
                }
                />
            <div className="relative flex mt-10 md:mt-5 space-x-8 w-full justify-center md:w-[800px]">
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
                  if (fileAvatar[0]?.content)
                    image.updateImg(
                  `${session?.user.name}-avatar`,
                  fileAvatar[0].content.split("base64,")[1]
                );
                if (fileBanner[0]?.content) {
                  image.updateImg(
                    `${session?.user.name}-banner`,
                    fileBanner[0].content.split("base64,")[1]
                  );
                }
                user.updateUser(session?.user?.id as string, data);
              }}
              >
                Save changes
              </button>
                </div>
            </div>
      </div>
    </main>
  );
}
