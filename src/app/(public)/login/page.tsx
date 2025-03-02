"use client";
import Button from "src/components/Button";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="w-full grid justify-center mt-20">
      <section className="w-full max-w-[1500vw] items-center justify-center text-white flex overflow-x-hidden">
        <div className="grid space-y-4">
          <div className="flex items-center space-x-2 mb-3">
            <Button
              onClick={() => signIn("google", { redirectTo: "/me" })}
              className="hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
              </svg>
              <h1 className="text-white">Google</h1>
            </Button>
            <h1>Or</h1>
            <Button
              onClick={() => signIn("discord", { redirectTo: "/me" })}
              className="hover:text-blue-200"
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
              <h1 className="text-white">Discord</h1>
            </Button>
          </div>

          <div className="w-full h-10 border-blueborder flex items-center space-x-2 border-2 shadow-blueshadow shadow-xl">
            <h1 className="ml-2">Username:</h1>
            <input
              className="bg-transparent focus:outline-none"
              placeholder="xxxx"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full h-10 border-blueborder flex items-center space-x-2 border-2 shadow-blueshadow shadow-xl">
            <h1 className="ml-2">Email:</h1>
            <input
              placeholder="xxxxxxx"
              className="bg-transparent focus:outline-none"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="flex gap-1 text-bluetext tablet:w-[24vw] w-[150px]">
              <button
                type="submit"
                className="hover:bg-blueborder shadow-blueshadow shadow-xl hover:text-black transtion-colors duration-300 border-4 border-blueborder bg-bluebg text-center p-2 px-4 font-bold flex flex-grow justify-center items-center"
              >
                Login
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center text-center p-3">
            <h1>You don&#39t have account??</h1>
            <button className="hover:bg-blueborder shadow-blueshadow shadow-xl hover:text-black transtion-colors duration-300 border-4 border-blueborder text-bluetext cursor-pointer bg-bluebg text-center p-2 px-4 font-bold flex flex-grow justify-center mt-10 w-[400px] tablet:w-[95vw]">
              Register
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
