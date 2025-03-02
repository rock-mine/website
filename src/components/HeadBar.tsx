import { useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Image from "next/image";
export default function HeadBar({
  setPage,
}: {
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const searchParams = useSearchParams();

  const actualPage = searchParams.get("page");
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold sm:text-[50px] tablet:text-[15px] text-[25px]">
        - Categories -
      </h1>
      <div className="sm:flex gap-1 text-bluetext tablet:w-[95vw] sm:w-[600px] grid w-[300px]">
        <Button
          className="bg-black/20 flex items-center justify-center gap-2 px-3 py-2  text-sm"
          variant="link"
          href="/?page=textures"
          onClick={() => setPage(0)}
          isActive={actualPage === "textures"}
        >
          <Image
            width={100}
            height={100}
            src="/icons/textures.svg"
            className="w-5 h-5 invert"
            alt="Share"
          />
          <h1> TEXTURES</h1>
        </Button>
        <Button
          className="bg-black/20 flex items-center justify-center gap-2 px-3 py-2  text-sm"
          variant="link"
          href="/?page=mods"
          onClick={() => setPage(0)}
          isActive={!actualPage || actualPage === "mods"}
        >
          <Image
            width={100}
            height={100}
            src="/icons/mods.svg"
            className="w-5 h-5 invert"
            alt="Share"
          />
          <h1>MODS</h1>
        </Button>
        <Button
          className="bg-black/20 flex items-center justify-center gap-2 px-3 py-2  text-sm"
          variant="link"
          href="/?page=maps"
          onClick={() => setPage(0)}
          isActive={actualPage === "maps"}
        >
          <Image
            width={100}
            height={100}
            src="/icons/user.svg"
            className="w-5 h-5 invert"
            alt="Share"
          />
          <h1>MAPS</h1>
        </Button>
      </div>
    </div>
  );
}
