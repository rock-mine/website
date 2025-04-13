import { useState } from "react";
import SearchBar from "src/components/SearchBar";
import HeadBar from "src/components/HeadBar";
import DynamicHome from "src/components/DynamicHome";
import ControlsHome from "src/components/ControlsHome";
import Head from "next/head";
import type { Addon } from "types";
import type { GetStaticProps } from "next";
import { addon } from "@/utils/db";
import { Search } from "lucide-react";

export const getStaticProps: GetStaticProps = async () => {
  const addons = await addon.getAll();
  return { props: { addons } };
};

export default function Main({ addons }: { addons: Addon[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState<string>("");
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
              <HeadBar setPage={setPage} />
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
                query={query}
                setQuery={setQuery}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            )}

            <section className="w-[100vw] flex justify-center items-center max-w-[1500px]">
              <DynamicHome
                addons={addons}
                page={page}
                selectedTags={selectedTags}
                query={query}
              />
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
