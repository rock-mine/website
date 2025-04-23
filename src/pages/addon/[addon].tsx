import Button from "src/components/Button";
import { addon as db, user } from "src/utils/db";
import Image from "next/image";
import {
  AlarmClock,
  BookA,
  Download,
  Heart,
  Home,
  ImagesIcon,
  Share,
} from "lucide-react";
import type { GetServerSideProps } from "next";
import moment from "moment";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import type { Addon, User } from "types";
import Head from "next/head";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useState, useEffect } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const addonId = context.params?.addon;
    if (typeof addonId !== "string") return { notFound: true };

    const addon = await db.getById(addonId);
    if (!addon?.author) return { notFound: true };

    const author = await user.findUser("id", addon.author);
    if (!author) return { notFound: true };

    return { props: { addon, author } };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
};

export default function Page({
  author,
  addon,
}: {
  addon: Addon;
  author: User;
}) {
  const { data: session, status } = useSession();
  const [actualPage, setActualPage] = useState<0 | 1 | 2>(0);
  const [vote, setVote] = useState(false);
  const [like, setLike] = useState(addon.likes || 0);

  useEffect(() => {
    if (status === "authenticated") {
      setVote(session.user.likes_posts?.includes(addon.id) ?? false);
    }
  }, [status, session?.user?.likes_posts, addon.id]);

  const handleLike = async () => {
    if (!session?.user) {
      signIn("discord");
      return;
    }

    const previousVote = vote;
    const previousLikes = like;

    // Optimistic update
    setVote(!previousVote);
    setLike(previousVote ? previousLikes - 1 : previousLikes + 1);

    try {
      if (!previousVote) {
        await db.setAddonState({ likes: previousLikes + 1 }, addon.id);
        await user.updateUser(session.user.id, {
          likes_posts: [...(session.user.likes_posts || []), addon.id],
        });
      } else {
        await db.setAddonState({ likes: previousLikes - 1 }, addon.id);
        await user.updateUser(session.user.id, {
          likes_posts: session.user.likes_posts.filter((id) => id !== addon.id),
        });
      }
    } catch (error) {
      // Revert on error
      setVote(previousVote);
      setLike(previousLikes);
      console.error("Failed to update like:", error);
    }
  };

  return (
    <section className="w-full flex flex-col items-center bg-bluebg text-white px-4">
      <Head>
        <title>{addon.name}</title>
        <meta name="description" content={addon.short_description} />
        <meta name="theme-color" content="#eb83f4" />
        <link rel="icon" href="/logo.jpg" />
        <meta property="og:title" content={addon.name} />
        <meta property="og:description" content={addon.short_description} />
        <meta
          property="og:url"
          content={`https://rock-mine.vercel.app/addon/${addon.id}`}
        />
        <meta
          property="og:image"
          content={addon.logo || "/default-addon-image.jpg"}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="h-16 sm:h-20 w-full" aria-hidden />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="flex flex-col items-center w-full lg:items-start">
          <div className="border-3 border-blueborder shadow-lg overflow-hidden w-full aspect-video relative">
            <Image
              fill
              className="w-full h-full object-cover"
              src={addon.logo}
              alt={addon.name}
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

        {/* Right Column */}
        <div className="lg:col-span-2 flex flex-col gap-4 w-full">
          <div className="bg-black/20 p-6 rounded-lg border-4 border-blueborder">
            <h1 className="text-3xl font-bold text-bluetext">{addon.name}</h1>

            <div className="flex flex-wrap items-center gap-4 p-2 mt-2">
              <div className="flex items-center gap-2">
                <AlarmClock className="h-5 w-5" />
                <span>
                  {moment(Number(addon.data_post)).format("DD/MM/YYYY")}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                <span>{like}</span>
              </div>

              <Link
                href={`/user/${author.name.toLowerCase()}`}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Image
                  width={32}
                  height={32}
                  src={`/api/image/${author.name}-avatar`}
                  className="w-8 h-8 rounded-full"
                  alt={author?.display_name}
                />
                <span className="font-medium">{author.display_name}</span>
              </Link>
            </div>

            {addon.tags && (
              <div className="flex flex-wrap gap-2 mt-4">
                {addon.tags.split(",").map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blueborder px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <Button
              className="flex items-center justify-center gap-2 py-2 text-sm"
              variant="link"
              href="/"
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Button>

            <Button
              className="flex items-center justify-center gap-2 py-2 text-sm"
              isActive={vote}
              onClick={handleLike}
            >
              <Heart className="h-5 w-5" />
              <span>{vote ? "Unlike" : "Like"}</span>
            </Button>

            <Button
              className="flex items-center justify-center gap-2 py-2 text-sm"
              onClick={() =>
                navigator.clipboard.writeText(window.location.href)
              }
            >
              <Share className="h-5 w-5" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full px-4 mt-8">
        <div className="flex gap-3 border-b-2 border-blueborder pb-2">
          <Button isActive={actualPage === 0} onClick={() => setActualPage(0)}>
            <BookA className="mr-2 h-4 w-4" />
            Description
          </Button>

          <Button isActive={actualPage === 1} onClick={() => setActualPage(1)}>
            <Download className="mr-2 h-4 w-4" />
            Downloads
          </Button>

          <Button isActive={actualPage === 2} onClick={() => setActualPage(2)}>
            <ImagesIcon className="mr-2 h-4 w-4" />
            Images
          </Button>
        </div>

        {/* Content Sections */}
        <div className="mt-6">
          {actualPage === 0 && (
            <MarkdownRenderer
              content={addon.description.replace(/\\n/g, "\n")}
            />
          )}

          {actualPage === 1 && (
            <div className="bg-black/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Downloads</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addon.downloads?.length > 0 ? (
                  addon.downloads.map((link, i) => (
                    <Button key={i} className="w-full" href={link.link}>
                      {link.name}
                    </Button>
                  ))
                ) : (
                  <p className="text-gray-400">No downloads available.</p>
                )}
              </div>
            </div>
          )}

          {actualPage === 2 && (
            <div className="bg-black/20 p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addon?.images ? (
                  addon.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden border-2 border-blueborder"
                    >
                      <Image
                        fill
                        src={image}
                        alt={`${addon.name} screenshot ${index + 1}`}
                        className="object-cover"
                        quality={85}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No images available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
