import type { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
// grid grid-cols-[800px_800px]

export const metadata: Metadata = {
  title: "About us",
  icons: "/logo.jpg",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-5 mt-10 md:mt-0">
      <Head>
        <title>About Us</title>
        <link rel="icon" href="/logo.jpg" type="image/x-icon" />
      </Head>
      <main className="flex flex-col items-center justify-center mt-8 min-h-screen bg-gradient-to-b from-[#16131B] to-[#1E2A2F] text-white">
        <h1 className="text-6xl font-bold mt-10 mb-8 text-gray-500">
          About Us
        </h1>

        <div className="flex flex-col md:grid md:grid-cols-[400px_400px] items-center justify-center gap-8 p-4">
          <div className="relative flex flex-col items-center bg-black/40 p-6 h-[360px] w-[400px] rounded-lg shadow-lg hover:shadow-hovershadow transition-shadow">
            <Image
              width={100}
              height={100}
              src="/blayy-avatar.png"
              alt="Blayy"
              className="w-32 h-32 rounded-full border-4 border-blueborder"
            />
            <h2 className="text-2xl font-bold mt-4 text-bluetext">Blayy</h2>
            <p className="mt-2 text-gray-400 text-center">
              Desenvolvedor Front-end apaixonado por criar interfaces intuitivas
              e responsivas. 
            </p>
            <Link
              target="_blank"
              href="https://github.com/blayy"
              className="absolute bottom-2 px-4 py-2 bg-black/40 hover:shadow-hovershadow shadow-xl hover:text-bluetext transition-all"
            >
              View Profile
            </Link>
          </div>

          <div className="relative flex flex-col items-center h-[360px] w-[400px] bg-black/40 p-6 rounded-lg shadow-lg hover:shadow-hovershadow transition-shadow">
            <Image
              width={100}
              height={100}
              alt="Matt"
              src="/matt-avatar.png"
              className="w-32 h-32 rounded-full border-4 border-blueborder"
            />
            <h2 className="text-2xl font-bold mt-4 text-bluetext">Matt</h2>
            <p className="mt-2 text-gray-400 text-center">
              Especialista em Back-end e DevOps, Matt garante que tudo funcione
              perfeitamente nos bastidores.
            </p>
            <Link
              href="https://github.com/minecodebr"
              target="_blank"
              className="absolute bottom-2 px-4 py-2 bg-black/40 hover:shadow-hovershadow shadow-xl hover:text-bluetext transition-all"
            >
              View Profile
            </Link>
          </div>
        </div>

        <Link
          href="/"
          className="mt-10 px-6 py-3 bg-black/40 hover:shadow-hovershadow shadow-xl hover:text-bluetext transition-all"
        >
          Back to Home
        </Link>
        <div className="mt-8 w-1/2 text-center">
          <p className="text-lg text-gray-500">
            Esse site tem o foco de proporcionar uma experiência de usuário
            agradável e fácil de usar, além de ser um projeto de aprendizado
            para desenvolvedores web. Se você tem alguma sugestão ou crítica,
            sinta-se à vontade para enviar um pull request ou abrir uma issue no
            GitHub.
          </p>
        </div>
      </main>
    </div>
  );
}
