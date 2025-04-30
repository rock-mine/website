import { user as db } from "@/utils/db";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import type { User } from "types";
import Custom404 from "../404";

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Isso roda a cada request
  if (context.params?.user) {
    const user = await db.findUser("name", context.params?.user as string);
    if (!user) return { props: {} };

    return {
      props: {
        user,
      },
    };
  }

  return { props: {} };
};
export default function Page({ user }: { user: User }) {
  if (!user) return <Custom404 />;
  return (
    <main className=" w-full relative mt-14">
      <Head>
        <title>{user.display_name}</title>
        <meta name="theme-color" content="#eb83f4" />
        <link rel="icon" href={`/api/image/${user?.name}-avatar`} />

        {/* Open Graph */}
        <meta property="og:title" content={user.display_name} />
        <meta property="og:description" content={user.bio} />
        <meta
          property="og:url"
          content={`https://rock-mine.vercel.app/user/${user}`}
        />
        <meta property="og:image" content={`/api/image/${user?.name}-avatar`} />
      </Head>
      <div className="bg-[#0b090e] relative w-full">
        <Image
          height={3000}
          width={3000}
          priority
          alt="banner"
          src={`/api/image/${user?.name}-banner`}
          className="aspect-3/2 object-cover h-[240px] w-full"
        />
        <span className="flex space-x-6 relative -top-20 w-full">
          <Image
            className="object-cover ml-4 h-[140px] w-[140px] rounded-full"
            width={340}
            height={340}
            alt="avatar"
            src={`/api/image/${user?.name}-avatar`}
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
          </div>
        </span>
        <div className="relative mx-auto -top-10 md:-top-20 p-4 rounded-md bg-[#0e0d11] w-[90%] border-2 border-white/20">
          {user.bio}
        </div>
      </div>
    </main>
  );
}
