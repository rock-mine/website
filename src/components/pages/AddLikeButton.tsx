"use client";

import type { Session } from "next-auth";
import Button from "../Button";
import Image from "next/image";
import { addon, user } from "@/utils/db";
import type { Addon } from "types";
import { useState } from "react";

interface AddLikeButtonProps {
  actualAddon: Addon;
  session: Session | null;
}

export default function AddLikeButton({
  actualAddon,
  session,
}: AddLikeButtonProps) {
  // Inicializa o estado "vote" verificando se o usuário já curtiu o addon
  const [vote, setVote] = useState(
    session?.user.likes_posts?.includes(actualAddon.id) || false
  );
  const [like, setLike] = useState(actualAddon.likes);

  // Função para tratar a lógica de curtir/descurtir
  const handleVote = () => {
    if (!session?.user?.likes_posts || !session.user.id) return;

    if (!vote) {
      // Adiciona o like caso ainda não tenha sido curtido
      setVote(true);
      setLike((prev) => prev + 1);
      addon.setAddonState({ likes: like + 1 }, actualAddon.id);

      // Atualiza os likes do usuário adicionando o ID do addon
      user.updateUser(session.user.id, {
        likes_posts: [
          ...(Array.isArray(session.user.likes_posts)
            ? session.user.likes_posts
            : []),
          actualAddon.id,
        ],
      });
    } else {
      // Remove o like caso o usuário já tenha curtido
      setVote(false);
      setLike((prev) => prev - 1);
      addon.setAddonState({ likes: like - 1 }, actualAddon.id);

      // Remove o ID do addon do array de likes utilizando comparação estrita
      user.updateUser(session.user.id, {
        likes_posts: session.user.likes_posts.filter(
          (postId) => postId !== actualAddon.id
        ),
      });
    }
  };

  return (
    <Button
      isActive={vote}
      onClick={handleVote}
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
