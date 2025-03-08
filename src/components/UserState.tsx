"use client";
import type { Session } from "next-auth";
import { useState } from "react";
import Button from "./Button";
import { user } from "@/utils/db";
import Image from "next/image";
import { signOut } from "next-auth/react";

import { link } from "fs";
import  Link  from "next/link";

export default function UserState({ session }: { session: Session | null }) {
  const [displayName, setDisplayName] = useState<string>(
    session?.user?.display_name as string
  );
  const [bio, setBio] = useState<string>(session?.user?.bio as string);

  return (
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
      <div className="absolute top-30 -left-10 w-[600px] md:relative md:mx-auto md:top-2 md:h-[200px] rounded-md bg-[#0e0d11] md:w-[90%]">
        <textarea
          className="resize-none outline-none w-full h-full p-4"
          defaultValue={session?.user?.bio}
          onChange={(e) => setBio(e.target.value)}
        />
      </div>
      <div className="relative flex mt-30 -left-[20%] md:mt-5 space-x-8 w-full md:left-0 md:w-[800px]">
        <button
          className="text-gray-300 hover:text-bluetext bg-bluebg transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md border-4 border-blueborder"
          onClick={() => signOut()}
          type="submit"
        >
          Log Out
        </button>
        <button
          className="text-gray-300 hover:text-bluetext bg-bluebg transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md border-4 border-blueborder"
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
              className="text-gray-300 hover:text-bluetext bg-bluebg transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md border-4 border-blueborder"
            >
             Create Project +
            </Link>
        <div className="flex-shrink-0">
      
          </div>
      </div>
    </div>
  );
}
