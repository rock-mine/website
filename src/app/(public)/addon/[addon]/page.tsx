import Button from "src/components/Button";
import { addon as db, user } from "src/utils/db";
import Image from "next/image";
import AddonControls from "@/components/AddonControls";
import { AlarmClock } from "lucide-react";
import type { Metadata } from "next";
import moment from "moment";
import { auth } from "@/utils/auth";
import AddLikeButton from "@/components/pages/AddLikeButton";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ addon: string }>;
}): Promise<Metadata> {
  const { addon } = await params;
  const addonData = await db.getById(addon);

  return {
    title: addonData.name,
    icons: "/logo.jpg",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ addon: string }>;
}) {
  const session = await auth();
  const actualAddon = (await params).addon;
  const addon = await db.getById(actualAddon);
  const author = await user.findUser("id", addon.author);

  return (
    <section className="w-full flex flex-col items-center bg-bluebg text-white px-4">

      <div className="h-16 sm:h-20 w-full" aria-hidden />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="flex flex-col items-center w-full lg:items-start">
          <div className="border-3 border-blueborder shadow-lg overflow-hidden w-full aspect-video relative">
            <Image
              fill
              className="w-full h-full object-cover"
              src={addon?.logo}
              alt={addon?.name}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="w-full bg-black/20 p-3 border-3 border-t-0 border-blueborder">
            <p className="text-gray-300 text-sm sm:text-base">
              {addon.short_description}
            </p>
          </div>
        </div>

   
        <div className="lg:col-span-2 flex flex-col gap-4 w-full">
          <div className="bg-black/20 p-4 sm:p-6 rounded-lg border-4 border-blueborder">
            <h1 className="text-2xl sm:text-3xl font-bold text-bluetext">
              {addon?.name}
            </h1>
            
            <div className="flex flex-wrap items-center gap-2 p-2 text-sm sm:text-base">
              <div className="flex items-center gap-1">
                <AlarmClock size={16} />
                <span>{moment(Number(addon.data_post)).format("DD/MM/YYYY")}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <Image
                  width={20}
                  height={20}
                  src="/icons/likes.svg"
                  className="w-4 h-4 sm:w-5 sm:h-5 object-contain invert"
                  alt="Likes"
                />
                <span>{addon.likes}</span>
              </div>
              
              <Link
                className="flex items-center gap-1"
                href={`/user/${author.name?.toLowerCase()}`}
              >
                <Image
                  width={32}
                  height={32}
                  src={author.image as string}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  alt="Author"
                />
                <span className="truncate max-w-[100px] sm:max-w-none">
                  {author?.display_name}
                </span>
              </Link>
            </div>

            {addon?.tags && (
              <div className="flex flex-wrap gap-2 mt-3 sm:mt-4">
                {addon?.tags.split(", ").map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blueborder text-white text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

        
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <Button
              className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm"
              variant="link"
              href="/"
            >
              <Image
                width={20}
                height={20}
                src="/icons/home.svg"
                className="w-4 h-4 sm:w-5 sm:h-5 invert"
                alt="Home"
              />
              <span className="truncate">Home</span>
            </Button>
            
            <AddLikeButton session={session} actualAddon={addon} />
            
            <Button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm">
              <Image
                width={20}
                height={20}
                src="/icons/share.svg"
                className="w-4 h-4 sm:w-5 sm:h-5 invert"
                alt="Share"
              />
              <span className="truncate">Share</span>
            </Button>
          </div>
        </div>
      </div>

      <AddonControls actualAddon={actualAddon} addon={addon} />
    </section>
  );
}