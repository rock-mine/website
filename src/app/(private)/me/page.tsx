import Head from "next/head";
import Image from "next/image";
import { auth } from "@/utils/auth";
import UserState from "@/components/UserState";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your profile",
  icons: "/logo.jpg",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user) return redirect("/login");

  console.log(session);

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

        <span className="flex space-x-8 relative -top-20 w-full">
          <Image
            className="object-cover h-[140px] w-[140px]"
            width={340}
            height={340}
            alt="avatar"
            src={session?.user?.image as string}
          />
          <UserState session={session} />
        </span>
      </div>

      {/*
      <div className="absolute right-6 top-4 gap-2 grid">
      <svg
      xmlns="http://www.w3.org/2000/svg"
          className="duration-200 hover:text-red-600"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
          >
          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
          </svg>
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
          >
          <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612" />
          </svg>
          <Image
          width={32}
          height={32}
          alt="last fm icon"
          src="/last_fm.svg"
          className="hover:fill-red-600"
          />
          </div>
          <div className="overflow-x-scroll">
          <h1 className="text-2xl p-2">Favorites:</h1>
          <div className="flex overflow-x-scroll w-full">
          {addons.addons
          .slice(0, 4)
          .filter((addon) => addon.creator === "Blayy")
          .map((addon, index) => (
              <Link
                key={index}
                href={addon.link}
                className="relative w-[460px] m-2 tablet:w-[95vw] h-[300px] hover:shadow-blueshadow hover:shadow-2xl transition-all duration-300 border-4 border-blueborder overflow-hidden"
                >
                <Image
                  height={2000}
                  width={2000}
                  alt="Addon"
                  className="w-full h-full object-cover"
                  src={addon.image}
                />
                <div className="absolute top-0 left-0 border-t-0 border-l-0 bg-black/60 text-bluetext border-4 border-blueborder px-1 py-1 font-bold text-lg">
                {addon.title}
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent text-white p-3 flex flex-col">
                <p className="text-sm">
                {addon.description.length > 80
                ? addon.description.slice(0, 80) + "..."
                      : addon.description}
                  </p>
                  {addon.tag && (
                    <div className="flex flex-wrap gap-2 mt-2">
                    {addon.tag.split(", ").map((tag, idx) => (
                        <span
                        key={idx}
                        className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg"
                        >
                          {tag}
                          </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
              ))}
        </div>
      </div>
      <div className="overflow-scroll h-[600px] mt-2">
        <h1 className="text-2xl p-2">All:</h1>
        <div className="grid grid-cols-4">
          {addons.addons
          .filter((addon) => addon.creator === "Blayy")
          .map((addon, index) => (
              <Link
              key={index}
              href={addon.link}
              className="relative w-[460px] m-2 tablet:w-[95vw] h-[300px] hover:shadow-blueshadow hover:shadow-2xl transition-all duration-300 border-4 border-blueborder overflow-hidden"
              >
                <Image
                  width={100}
                  height={100}
                  alt="Addon image"
                  className="w-full h-full object-cover"
                  src={addon.image}
                />
                <div className="absolute top-0 left-0 border-t-0 border-l-0 bg-black/60 text-bluetext border-4 border-blueborder px-1 py-1 font-bold text-lg">
                {addon.title}
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/80 to-transparent text-white p-3 flex flex-col">
                <p className="text-sm">
                {addon.description.length > 80
                ? addon.description.slice(0, 80) + "..."
                : addon.description}
                  </p>
                  {addon.tag && (
                    <div className="flex flex-wrap gap-2 mt-2">
                    {addon.tag.split(", ").map((tag, idx) => (
                        <span
                        key={idx}
                          className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-lg"
                          >
                          {tag}
                          </span>
                          ))}
                    </div>
                    )}
                </div>
              </Link>
            ))}
            </div>
      </div>
                */}
    </main>
  );
}
