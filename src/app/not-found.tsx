"use client";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <main className="flex flex-col items-center justify-center mt-20">
      <Image
        width={100}
        height={100}
        className="w-32 h-32 items-center justify-center mt-10 border-blueborder border-4"
        src="/horseface.png"
        alt="zz"
      />
      <div className="flex items-center gap-2 p-2">
        <Image
          width={100}
          height={100}
          src="/icons/error.svg"
          className="w-16 h-16 items-center justify-center invert"
          alt="error"
        />
        <h1 className="text-6xl font-bold flex items-center justify-center">
          {" "}
          ERROR! 404{" "}
        </h1>
        <Image
          width={100}
          height={100}
          src="/icons/error.svg"
          className="w-16 h-16 items-center justify-center invert"
          alt="error"
        />
      </div>
      <p className="mt-4 text-lg text-red-400">Oops! Page not found. :/</p>

      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-black/40 hover:shadow-hovershadow  shadow-xl hover:text-bluetext"
      >
        Back to Home
      </Link>
      <div className="flex items-center justify-center flex-col w-1/2">
        <p className="mt-4 text-lg text-gray-500">
          Sometimes, in life and on the internet, we take unexpected paths. But
          every mistake, every deviation, is just another learning opportunity.
        </p>
      </div>
    </main>
  );
}
