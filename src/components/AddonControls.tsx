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
    <>
      <div className="max-w-6xl w-full mt-6 flex gap-2 leading-none items-center justify-center ">
        <Button
          className="flex items-center justify-center gap-2 px-3 leading-none w-40"
          isActive={!actualPage || actualPage === "description"}
          onClick={() => router.push(`${actualAddon}?page=description`)}
        >
          <Image
            width={100}
            height={100}
            src="/icons/desc.svg"
            className="w-5 h-5 invert"
            alt="Description"
          />
          <p>Description</p>
        </Button>

        <Button
          className="flex items-center justify-center gap-2 px-3 leading-none w-40"
          isActive={actualPage === "download"}
          onClick={() => router.push(`${actualAddon}?page=download`)}
        >
          <Image
            width={100}
            height={100}
            src="/icons/files.svg"
            className="w-5 h-5 invert"
            alt="Files"
          />
          <p>Downloads</p>
        </Button>
        <Button
          className="flex items-center justify-center gap-2 px-3 leading-none w-40"
          isActive={actualPage === "wiki"}
          onClick={() => router.push(`${actualAddon}?page=images`)}
        >
          <Image
            width={100}
            height={100}
            src="/icons/images.svg"
            className="w-5 h-5 invert"
            alt="Images"
          />
          <p>Images</p>
        </Button>
      </div>

      <div className="max-w-6xl w-full mt-10">
        {!actualPage || actualPage == "description" ? (
          <MarkdownRenderer
            content={addon?.description.replace(/\\n/g, "\n")}
          />
        ) : actualPage == "download" ? (
          <div className="p-6 bg-black/20 rounded-lg">
            <h1 className="text-2xl font-bold text-bluetext mb-4">
              Download Links
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addon?.downloads?.map((link, i) => (
                <Button key={i} className="w-full" href={link.url}>
                  {link.name}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
