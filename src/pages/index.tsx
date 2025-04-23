import { useState } from "react";
import SearchBar from "src/components/SearchBar";
import HeadBar from "src/components/HeadBar";
import ControlsHome from "src/components/ControlsHome";
import Head from "next/head";
import type { Addon } from "types";
import type { GetStaticProps } from "next";
import { addon } from "@/utils/db";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const getStaticProps: GetStaticProps = async () => {
  const addons = await addon.getAll();
  return { props: { addons } };
};

export default function Main({ addons }: { addons: Addon[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [actualPage, setActualPage] = useState(0);
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <div>
      <Head>
        <title>Rock Mine</title>
        <link rel="icon" href="/logo.jpg" type="image/x-icon" />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-[#16131B] to-[#1E2A2F] text-white">
        <main className="flex flex-col items-center justify-center sm:pt-5 pt-14"></main>

        <main className="w-full bg-bluebg bg-fixed overflow-x-hidden text-white flex justify-center">
          <Head>
            <title>Rock Mine</title>
            <link rel="icon" href="/logo.jpg" type="image/x-icon" />
          </Head>
          <div className="stars flex flex-col max-w-[1500px] w-[100vw] h-[100%] justify-center gap-5">
            <header className="w-[100vw] h-[200px] max-w-[1500px] grid sm:flex items-center justify-center tablet:mt-28">
              <HeadBar
                actualPage={actualPage}
                setActualPage={setActualPage}
                setPage={setPage}
              />
              <div className="absolute sm:left-4 tablet:mr-0 top-2"></div>
            </header>
            <div className="flex w-full items-center justify-center">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className={`flex items-center justify-center gap-0 px-3 py-2 rounded-lg text-sm
                ${
                  showSearch ? "bg-blueselected" : "bg-bluebg bg-black/20"
                } text-bluetext hover:bg-bluehover`}
              >
                <Search />
                <p className="ml-2">
                  {" "}
                  {showSearch ? " Hide Filters" : " Show Search Filters"}
                </p>
              </button>
            </div>
            {showSearch && (
              <SearchBar
                actualPage={actualPage}
                query={query}
                setQuery={setQuery}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            )}

            <section className="w-[100vw] flex justify-center items-center max-w-[1500px]">
              {actualPage === 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-2 gap-6 w-[80%] sm:w-[80%]">
                  {addons
                    ?.filter(
                      (addon) =>
                        (query === "" ||
                          addon?.name
                            .toLowerCase()
                            .includes(query.toLowerCase())) &&
                        (selectedTags.length === 0 ||
                          selectedTags.every((tag) =>
                            addon?.tags?.split(", ").includes(tag.toLowerCase())
                          ))
                    )
                    .map(
                      (addon, index) =>
                        ((index < page + 8 && index >= page) ||
                          (addon.name
                            .toLowerCase()
                            .includes(query.toLowerCase()) &&
                            query !== "")) && (
                          <Link
                            key={index}
                            href={`/addon/${addon.name
                              .toLowerCase()
                              .replace(/ /gi, "")}`}
                            className="relative w-auto h-[300px] hover:shadow-hovershadow hover:shadow-2xl transition-all duration-300 border-4 border-blueborder overflow-hidden group"
                          >
                            <Image
                              width={1000}
                              height={1000}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              src={addon.logo}
                              alt={addon.name}
                            />
                            <div className="absolute top-0 left-0 bg-black/80 text-bluetext border-b-4 border-r-4 border-blueborder px-4 py-0font-bold text-lg">
                              <h1 className="text-center text-lg font-bold">
                                {addon.name}
                              </h1>
                            </div>
                            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white p-4 flex flex-col">
                              <p className="text-sm">
                                {addon.short_description.length > 80
                                  ? addon.short_description.slice(0, 80) + "..."
                                  : addon.short_description}
                              </p>
                              {addon.tags && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {addon.tags.split(", ").map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="bg-blueborder text-white text-xs font-semibold px-2 py-1 rounded-lg"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        )
                    )}
                </div>
              ) : (
                <div className="flex items-center absolute w-full h-20 justify-center text-bluetext text-2xl font-bold">
                  <h1 className="text-center">
                    Oops... parece que você encontrou um caminho inválido!
                  </h1>
                </div>
              )}
            </section>

            <ControlsHome page={page} setPage={setPage} />

            <div className="w-full grid justify-items-center">
              <h1>- Page {page / 8} -</h1>
              <p className=" text-gray-400 mt-4">
                @ Powered By RockMine Studio
              </p>
            </div>

            <div></div>
          </div>
        </main>
      </div>
    </div>
  );
}
