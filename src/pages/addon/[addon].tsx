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
  X,
} from "lucide-react";
import type { GetServerSideProps } from "next";
import moment from "moment";
import Link from "next/link";
import { useSession } from "next-auth/react";
import type { Addon, User } from "types";
import Head from "next/head";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.params?.addon) {
    const addon = await db.getById(context.params?.addon as string);
    if (!addon?.author) return { props: {} };
    const author = await user.findUser("id", addon.author);

    return { props: { addon, author } };
  } else return { props: {} };
};

export default function Page({
  author,
  addon,
}: {
  addon: Addon;
  author: User;
}) {
  const { data: session } = useSession();
  const [actualPage, setActualPage] = useState<0 | 1 | 2>(0);
  const [vote, setVote] = useState(
    session?.user.likes_posts?.includes(addon.id) || false
  );
  const [like, setLike] = useState(addon?.likes || 0);
  if (!addon)
    return (
      <div className="h-full w-full fixed grid place-items-center text-center space-y-8">
        <span className="flex items-center space-x-1.5">
          <X size={82} className="text-purple-500" />
          <h1 className="text-4xl">Addon not found!</h1>
        </span>
      </div>
    );
  else {
    return (
      <section className="w-full flex flex-col items-center bg-bluebg text-white px-4">
        <Head>
          <title>{addon.name}</title>
          <meta name="description" content={addon.short_description} />
          <meta name="theme-color" content="#eb83f4" />
          <link rel="icon" href="./logo.jpg" />
          <meta property="og:title" content={addon.name} />
          <meta property="og:description" content={addon.short_description} />
          <meta
            property="og:url"
            content={`https://rock-mine.vercel.app/addon/${addon}`}
          />
          <meta property="og:image" content={addon.logo} />
          <meta property="og:image:width" content="920" />
          <meta property="og:image:height" content="518" />
          <meta property="og:image:alt" content={addon.name} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={addon.name} />
          <meta name="twitter:description" content={addon.short_description} />
          <meta name="twitter:image" content={addon.logo} />
        </Head>

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
                  <AlarmClock />
                  <span>
                    {moment(Number(addon.data_post)).format("DD/MM/YYYY")}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Heart />
                  <span>{addon.likes}</span>
                </div>

                <Link
                  className="flex items-center gap-1"
                  href={`/user/${author.name?.toLowerCase()}`}
                >
                  <Image
                    width={32}
                    height={32}
                    src={`/api/image/${author.name}-avatar`}
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
                <Home />
                <span className="truncate">Home</span>
              </Button>

              <Button
                isActive={vote}
                onClick={() => {
                  if (!session?.user?.id || !session.user.likes_posts) return;

                  if (!vote) {
                    // Adiciona o like caso ainda não tenha sido curtido
                    setVote(true);
                    setLike((prev) => prev + 1);
                    db.setAddonState({ likes: like + 1 }, addon.id);

                    // Atualiza os likes do usuário adicionando o ID do addon
                    user.updateUser(session.user.id, {
                      likes_posts: [
                        ...(Array.isArray(session.user.likes_posts)
                          ? session.user.likes_posts
                          : []),
                        addon.id,
                      ],
                    });
                  } else {
                    // Remove o like caso o usuário já tenha curtido
                    setVote(false);
                    setLike((prev) => prev - 1);
                    db.setAddonState({ likes: like - 1 }, addon.id);

                    // Remove o ID do addon do array de likes utilizando comparação estrita
                    user.updateUser(session.user.id, {
                      likes_posts: session.user.likes_posts.filter(
                        (postId) => postId !== addon.id
                      ),
                    });
                  }
                }}
                className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm"
              >
                <Heart />
                <p>Vote Like</p>
              </Button>

              <Button className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm">
                <Share />
                <span className="truncate">Share</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl w-full px-4">
          {/* Controles de navegação */}
          <div className="w-full mt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 leading-none">
            <Button
              className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm"
              isActive={actualPage === 0}
              onClick={() => setActualPage(0)}
            >
              <BookA />
              <span className="truncate">Description</span>
            </Button>

            <Button
              className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm"
              isActive={actualPage === 1}
              onClick={() => setActualPage(1)}
            >
              <Download />
              <span className="truncate">Downloads</span>
            </Button>

            <Button
              className="flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 text-xs sm:text-sm"
              isActive={actualPage === 2}
              onClick={() => setActualPage(2)}
            >
              <ImagesIcon />
              <span className="truncate">Images</span>
            </Button>
          </div>

          {/* Conteúdo */}
          <div className="w-full mt-6 sm:mt-10">
            {actualPage === 0 ? (
              <MarkdownRenderer
                content={addon?.description.replace(/\\n/g, "\n")}
              />
            ) : actualPage === 1 ? (
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
      </section>
    );
  }
}
