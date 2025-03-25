"use client";
import Image from "next/image";
import Button from "./Button";
import MarkdownRenderer from "./MarkdownRenderer";
import { useRouter, useSearchParams } from "next/navigation";
import type { Addon } from "@/types";

export default function AddonControls({
  actualAddon,
  addon,
}: {
  actualAddon: string;
  addon: Addon;
}) {
  const actualPage = useSearchParams().get("page");
  const router = useRouter();

  return (
    <div className="max-w-6xl w-full px-4">
      {/* Controles de navegação */}
      <div className="w-full mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 leading-none">
        <Button
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm"
          isActive={!actualPage || actualPage === "description"}
          onClick={() => router.push(`${actualAddon}?page=description`)}
        >
          <Image
            width={20}
            height={20}
            src="/icons/desc.svg"
            className="w-4 h-4 sm:w-5 sm:h-5 invert"
            alt="Description"
          />
          <span className="truncate">Description</span>
        </Button>

        <Button
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm"
          isActive={actualPage === "download"}
          onClick={() => router.push(`${actualAddon}?page=download`)}
        >
          <Image
            width={20}
            height={20}
            src="/icons/files.svg"
            className="w-4 h-4 sm:w-5 sm:h-5 invert"
            alt="Files"
          />
          <span className="truncate">Downloads</span>
        </Button>

        <Button
          className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm"
          isActive={actualPage === "wiki"}
          onClick={() => router.push(`${actualAddon}?page=images`)}
        >
          <Image
            width={20}
            height={20}
            src="/icons/images.svg"
            className="w-4 h-4 sm:w-5 sm:h-5 invert"
            alt="Images"
          />
          <span className="truncate">Images</span>
        </Button>
      </div>

      {/* Conteúdo */}
      <div className="w-full mt-6 sm:mt-10">
        {!actualPage || actualPage === "description" ? (
          <MarkdownRenderer
            content={addon?.description.replace(/\\n/g, "\n")}
          />
        ) : actualPage === "download" ? (
          <div className="p-4 sm:p-6 bg-black/20 rounded-lg">
            <h1 className="text-xl sm:text-2xl font-bold text-bluetext mb-3 sm:mb-4">
              Download Links
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {addon?.downloads?.map((link, i) => (
                <Button
                  key={i}
                  variant="link"
                  className="w-full text-xs sm:text-sm"
                  href={link.link}
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}