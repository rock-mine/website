import { useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { Blocks, Map, PaintBucket } from "lucide-react";
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
          <PaintBucket />
          <h1> TEXTURES</h1>
        </Button>
        <Button
          className="bg-black/20 flex items-center justify-center gap-2 px-3 py-2  text-sm"
          variant="link"
          href="/?page=mods"
          onClick={() => setPage(0)}
          isActive={!actualPage || actualPage === "mods"}
        >
          <Blocks />
          <h1>MODS</h1>
        </Button>
        <Button
          className="bg-black/20 flex items-center justify-center gap-2 px-3 py-2  text-sm"
          variant="link"
          href="/?page=maps"
          onClick={() => setPage(0)}
          isActive={actualPage === "maps"}
        >
          <Map />
          <h1>MAPS</h1>
        </Button>
      </div>
    </div>
  );
}
