import type { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import { Blocks, Map, PaintBucket } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";

export default function HeadBar({
  setPage,
  setActualPage,
  actualPage,
}: {
  setPage: Dispatch<SetStateAction<number>>;
  setActualPage: Dispatch<SetStateAction<number>>;
  actualPage: number;
}) {
  const [showWarning, setShowWarning] = useState(false);

  const handleInactiveButtonClick = () => {
    setShowWarning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center">

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black p-6 rounded-lg max-w-md relative border-4 border-blueborder shadow-blueshadow shadow-xl">
            <button
              onClick={() => setShowWarning(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold text-red-600 mb-2">Feature in development</h2>
            <p className="text-gray-700">
              At the moment, only the Mods section is complete. The Textures and Maps sections
              will be available soon. Thank you for your understanding!
            </p>
            <div className="mt-4 flex justify-end">
              <Button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2"
              >
                OK!!
              </Button>
            </div>
          </div>
        </div>
      )}

      <h1 className="font-bold sm:text-[50px] tablet:text-[15px] text-[25px]">
        - Categories -
      </h1>
      <div className="sm:flex gap-1 text-bluetext tablet:w-[95vw] sm:w-[600px] grid w-[300px]">
        <Button
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 border-gray-400"
          onClick={handleInactiveButtonClick}
          isActive={false}

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
          className="flex items-center justify-center gap-2 px-3 py-2 text-sm text-gray-600 border-gray-400"
          onClick={handleInactiveButtonClick}
          isActive={false}

        >
          <Map />
          <h1>MAPS</h1>
        </Button>
      </div>
    </div>
  );
}