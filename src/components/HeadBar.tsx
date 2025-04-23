import type { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { Blocks, Map, PaintBucket } from "lucide-react";
export default function HeadBar({
  setPage,
  setActualPage,
  actualPage,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  setActualPage: Dispatch<SetStateAction<number>>;
  actualPage: number;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-bold sm:text-[50px] tablet:text-[15px] text-[25px]">
        - Categories -
      </h1>
      <div className="sm:flex gap-1 text-bluetext tablet:w-[95vw] sm:w-[600px] grid w-[300px]">
        <Button
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm"
          onClick={() => {
            setPage(0);
            setActualPage(2);
          }}
          isActive={actualPage === 2}
        >
          <PaintBucket />
          <h1> TEXTURES</h1>
        </Button>
        <Button
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm"
          onClick={() => {
            setPage(0);
            setActualPage(0);
          }}
          isActive={actualPage === 0}
        >
          <Blocks />
          <h1>MODS</h1>
        </Button>
        <Button
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm"
          onClick={() => {
            setPage(0);
            setActualPage(1);
          }}
          isActive={actualPage === 1}
        >
          <Map />
          <h1>MAPS</h1>
        </Button>
      </div>
    </div>
  );
}
