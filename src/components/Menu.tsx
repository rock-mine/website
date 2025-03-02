"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import type { Session } from "next-auth";

const Menu = ({ session }: { session: Session | null }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black/40 backdrop-blur-md border-b border-blueborder shadow-lg fixed top-0 w-full z-50">
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
            <Link
              href={session?.user ? "/me" : "login"}
              className="text-gray-300 hover:text-bluetext bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md"
            >
              {session?.user ? "Profile" : "Login"}
            </Link>
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
