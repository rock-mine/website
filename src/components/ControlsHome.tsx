import addons from "@/extras/addons.json";
import { useSearchParams } from "next/navigation";
import type { Dispatch, SetStateAction } from "react";
import Button from "src/components/Button";

export default function ControlsHome({
  page,
  setPage,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}) {
  const searchParams = useSearchParams();
  const actualPage = searchParams.get("page");

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex gap-1 text-bluetext tablet:w-[95vw] w-[500px]">
        {actualPage != "creators" && (
          <>
            <h1 className=" text-blueborder">+*</h1>

            <Button
              onClick={() =>
                (actualPage == "mods" && addons.addons[page - 8]) ||
                (actualPage == "textures" && addons.addonspacks[page - 8])
                  ? setPage(page - 8)
                  : null
              }
            >
              {" "}
              <p> *- Previous Page</p>
            </Button>

            <Button
              onClick={() =>
                (actualPage == "mods" && addons.addons[page + 8]) ||
                (actualPage == "textures" && addons.addonspacks[page + 8])
                  ? setPage(page + 8)
                  : null
              }
            >
              <p>Next Page -*</p>
            </Button>

            <h1 className=" text-blueborder">*+</h1>
          </>
        )}
      </div>
    </div>
  );
}
