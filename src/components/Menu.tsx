"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";
import { signIn } from "next-auth/react";

const Menu = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md border-b border-blueborder shadow-lg fixed top-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-bluetext text-2xl font-bold hover:text-bluehover transition-colors"
            >
              <Image
                width={800}
                height={800}
                className=" tablet:w-[95vw] sm:w-[300px] grid w-[150px]"
                src="/rocklogo.png"
                alt="Rock Mine Logo"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {session?.user ? (
              <Link
                href="/me"
                className="text-gray-300 hover:text-bluetext bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md"
              >
                Profile
              </Link>
            ) : (
              <button
                onClick={() => signIn("discord", { redirectTo: "/me" })}
                className="text-gray-300 hover:text-bluetext bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md flex items-center gap-1.5"
              >
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
              </button>
            )}
            <Link
              href="/settings"
              className="text-gray-300 hover:text-bluetext bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md"
            >
              Settings
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-bluetext bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md"
            >
              About
            </Link>
            <Link
              href="/creators"
              className="text-gray-300 hover:text-bluetext  bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md"
            >
              Support
            </Link>
            {session?.user.role?.includes("creator") && (
              <Link
                href="/addproject"
                className=" text-gray-300 hover:text-bluetext  bg-gray-500/5 hover:bg-bluehover/20 px-3 py-2 rounded-md transition-colors"
              >
                Add Project +
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-bluetext focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => toggleMenu()}
          className="md:hidden bg-black/60 backdrop-blur-md border-t border-blueborder"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href={session?.user ? "/me" : "login"}
              className="block text-gray-500 hover:text-bluetext  hover:bg-bluehover/20 px-3 py-2 rounded-md transition-colors"
            >
              {session?.user ? "*+ Profile +*" : "*+ Login +*"}
            </Link>
            <Link
              href="/settings"
              className="block text-gray-500 hover:text-bluetext  hover:bg-bluehover/20 px-3 py-2 rounded-md transition-colors"
            >
              *+ Settings +*
            </Link>
            <Link
              href="/about"
              className="block text-gray-500 hover:text-bluetext  hover:bg-bluehover/20 px-3 py-2 rounded-md transition-colors"
            >
              *+ About +*
            </Link>
            <Link
              href="/support"
              className="block text-gray-500 hover:text-bluetext  hover:bg-bluehover/20 px-3 py-2 rounded-md transition-colors"
            >
              *+ Support +*
            </Link>
            {session?.user.role?.includes("creator") && (
              <Link
                href="/addproject"
                className="block text-gray-500 hover:text-bluetext  hover:bg-bluehover/20 px-3 py-2 rounded-md transition-colors"
              >
                *+ Add Project. +*
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menu;
