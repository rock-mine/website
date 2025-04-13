import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Addon } from "types";
import Image from "next/image";

export default function DynamicHome({
  selectedTags,
  addons,
  query,
  page,
}: {
  addons: Addon[];
  selectedTags: string[];
  query: string;
  page: number;
}) {
  const searchParams = useSearchParams();

  const actualPage = searchParams.get("page");

  return !actualPage || actualPage === "mods" ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 tablet:grid-cols-2 gap-6 w-[80%] sm:w-[80%]">
      {addons
        ?.filter(
          (addon) =>
            addon?.name.toLowerCase().includes(query.toLowerCase()) &&
            (selectedTags.length === 0 ||
              selectedTags.every((tag) =>
                addon?.tags?.split(", ").includes(tag)
              ))
        )
        .map(
          (addon, index) =>
            ((index < page + 8 && index >= page) ||
              (addon.name.toLowerCase().includes(query.toLowerCase()) &&
                query !== "")) && (
              <Link
                key={index}
                href={`/addon/${addon.name.toLowerCase().replace(/ /gi, "")}`}
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
  ) : actualPage === "mapss" ? (
    <div className="grid grid-cols-2 tablet:grid-cols-4 gap-6 p-6"></div>
  ) : (
    <div className="flex items-center absolute w-full h-20 justify-center text-bluetext text-2xl font-bold">
      <h1 className="text-center">
        Oops... parece que você encontrou um caminho inválido!
      </h1>
    </div>
  );
}
