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
