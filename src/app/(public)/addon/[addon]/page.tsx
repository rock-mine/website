import Button from "src/components/Button";
import { addon as db, user } from "src/utils/db";
import Image from "next/image";
import AddonControls from "@/components/AddonControls";
import { AlarmClock } from "lucide-react";
import type { Metadata } from "next";
import moment from "moment";
import { auth } from "@/utils/auth";
import AddLikeButton from "@/components/pages/AddLikeButton";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ addon: string }>;
}): Promise<Metadata> {
  // read route params
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
  const author = await user.findUser({ id: addon.author as string });
  console.log("author:");
  console.log(author);

  /*const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Confira este site!",
        text: "Encontrei algo interessante para você:",
        url: window.location.href,
      });
    } else {
    }
  };*/
  return (
    <section className="w-full flex flex-col items-center bg-bluebg text-white">
      <p className="mt-11 text-gray-400 ">-</p>
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/3">
          <div className="border-3 border-blueborder shadow-lg overflow-hidden w-95">
            <Image
              width={1000}
              height={1000}
              className="w-full h-auto object-cover"
              src={addon?.logo}
              alt={addon?.name}
            />
          </div>
          <div className="w-95 h-20 bg-black/20 p-3  border-3 border-t-0 border-blueborder">
            <div className="flex items-center">
              <p className=" text-gray-300 p-1 text-sm">
                {addon.short_description}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4 w-full">
          <div className="bg-black/20 p-6 rounded-lg border-4 border-blueborder">
            <h1 className="text-3xl flex font-bold  text-bluetext">
              {addon?.name}{" "}
            </h1>
            <div className="flex items-center gap-2 p-2">
              <AlarmClock />
              <span className="text-white text-sm">
                {moment(Number(addon.data_post)).format("L")}
              </span>
              <Image
                width={100}
                height={100}
                src="/icons/likes.svg"
                className="w-5 h-5 object-contain invert"
                alt="Icon"
              />
              <span className="text-white text-sm">{addon.likes}</span>
              <Image
                width={100}
                height={100}
                src={author.image as string}
                className="w-8 h-8 object-contain rounded-full"
                alt="Icon"
              />
              <span className="text-white text-sm">{author?.name}</span>
            </div>

            {addon?.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {addon?.tags.split(", ").map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blueborder text-white text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm"
              variant="link"
              href="/"
            >
              <Image
                width={100}
                height={100}
                src="/icons/home.svg"
                className="w-5 h-5 invert"
                alt="Home"
              />
              <p>Home</p>
            </Button>
            <AddLikeButton session={session} actualAddon={addon} />
            <Button className="flex items-center justify-center gap-2 px-3 rounded-lg text-sm">
              <Image
                width={100}
                height={100}
                src="/icons/share.svg"
                className="w-5 h-5 invert"
                alt="Share"
              />
              <p>Share</p>
            </Button>
          </div>
        </div>
      </div>

      <AddonControls actualAddon={actualAddon} addon={addon} />
    </section>
  );
}
