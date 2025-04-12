import { user as db } from "@/utils/db";
import type { Metadata } from "next";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ user: string }>;
}): Promise<Metadata> {
  // read route params
  const { user } = await params;
  const userData = await db.findUser("name", user);

  return {
    title: userData.display_name,
    icons: userData.image,
    "og:title": userData.name,
    "og:description": userData.bio,
    "og:url": "https://embed.com/this-is-the-site-url",
    "og:image": userData.image,
    "theme-color": "#eb83f4",
  } as Metadata;
}

export default async function Page({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const userName = (await params).user;
  const user = await db.findUser("name", userName);

  return (
    <main className=" w-full relative mt-14">
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
            className="object-cover ml-4 h-[140px] w-[140px] rounded-full"
            width={340}
            height={340}
            alt="avatar"
            src={user?.image as string}
          />
          <div className="relative w-full h-full">
            <div className="w-full">
              <div className="grid justify-items-start w-full">
                <div className="text-[40px] outline-none relative max-w text-start">
                  {user?.display_name}
                </div>
                <h1 className="text-[17px] text-zinc-500">
                  @{user?.name?.toLowerCase()}
                </h1>
              </div>
              {user.role && user.role != "" && (
                <div className="flex items-center space-x-2">
                  <h1>Roles: </h1>
                  {user.role?.split(", ").map((role, i) => (
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
            <div className="absolute top-30 overflow-y-auto -left-10 max-h-[800px] max-w md:relative md:mx-auto md:top-2 md:max-h-[200px] rounded-md bg-[#0e0d11] md:w-[90%] border-2 border-white/20">
              <div className="resize-none outline-none w-full h-full p-4 text-start">
                {user.bio}
              </div>
            </div>
          </div>
        </span>
      </div>
    </main>
  );
}
