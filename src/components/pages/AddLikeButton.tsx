"use client";

/*
  @param Precisa melhora esse codigo, arruma quando pode 
  @param By MineCode
*/

import type { Session } from "next-auth";
import Button from "../Button";
import Image from "next/image";
import { addon, user } from "@/utils/db";
import type { Addon } from "@/types";
import { useState } from "react";

export default function AddLikeButton({
  session,
  actualAddon,
}: {
  actualAddon: Addon;
  session: Session | null;
}) {
  const [vote, setVote] = useState(
    session?.user.likes_posts?.includes(actualAddon.id)
  );
  const [like, setLike] = useState(actualAddon.likes);

  return (
    <Button
      isActive={vote}
      onClick={() => {
        if (!session?.user?.likes_posts) return;
        if (!vote && !session?.user.likes_posts?.includes(actualAddon.id)) {
          setVote(true);
          addon.setAddonState({ likes: like + 1 }, actualAddon.id);
          setLike(like + 1);

          user.updateUser(session?.user.id as string, {
            likes_posts: [
              ...(Array.isArray(session?.user?.likes_posts)
                ? session?.user?.likes_posts
                : []),
              actualAddon.id,
            ],
          });
        } else {
          setVote(false);

          addon.setAddonState({ likes: like - 1 }, actualAddon.id);
          setLike(like - 1);
          user.updateUser(session?.user.id as string, {
            likes_posts: session.user.likes_posts.filter(
              (v) => !v.includes(actualAddon.id)
            ),
          });
        }
      }}
      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm"
    >
      <Image
        width={100}
        height={100}
        src="/icons/likes.svg"
        className="w-5 h-5 invert"
        alt="Like"
      />
      <p>Vote Like</p>
    </Button>
  );
}
