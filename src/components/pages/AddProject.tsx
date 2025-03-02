"use client";
import Input from "src/components/Input";
import { useFilePicker } from "use-file-picker";
import {
  Bold,
  Italic,
  RocketIcon,
  StickerIcon,
  Strikethrough,
  Underline,
  EyeIcon,
  EditIcon,
  CodeIcon,
  LinkIcon,
  ImageIcon,
} from "lucide-react"; // Adicionei ícones para novas formatações
import Button from "src/components/Button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { addon } from "src/utils/db";
import type { User, Addon } from "@/types";
import type { Session } from "next-auth";
import MarkdownRenderer from "src/components/MarkdownRenderer";

type AddonBaseConfig = {
  name?: string;
  short_description?: string;
  description?: string;
  logo?: string;
};

export default function AddProject({ session }: { session: Session | null }) {
  const [data, setData] = useState<AddonBaseConfig | null>();
  const [viewErro, setViewErro] = useState(false);
  const [viewSucessSend, setSendSucess] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Referência para o textarea

  const { openFilePicker, filesContent } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    validators: [],
    onFilesSuccessfullySelected: ({ filesContent }) => {
      setData((baseData) => ({
        ...baseData,
        logo: filesContent[0]?.content,
      }));
    },
  });

  /// Função para aplicar formatação ao texto selecionado
  const applyFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = data?.description || "";

    // Texto antes da seleção + texto formatado + texto após a seleção
    const newText =
      text.substring(0, start) +
      `${prefix}${text.substring(start, end)}${suffix}` +
      text.substring(end);

    // Atualiza o estado com o novo texto formatado
    setData((baseData) => ({
      ...baseData,
      description: newText,
    }));

    // Reposiciona o cursor após a formatação
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  // Função para adicionar um link
  const addLink = () => {
    const url = prompt("Digite a URL:");
    if (url) {
      applyFormatting("[", `](${url})`);
    }
  };

  // Função para adicionar uma imagem
  const addImage = () => {
    const url = prompt("Digite a URL da imagem:");
    if (url) {
      const altText = prompt("Digite o texto alternativo (alt):");
      applyFormatting(`![${altText || "imagem"}]`, `(${url})`);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="mt-20">
      {viewSucessSend ? (
        <div className="h-full w-full fixed grid place-items-center text-center space-y-8">
          <span className="flex items-center space-x-1.5">
            <RocketIcon size={120} />
            <h1 className="text-4xl">Success to send project!</h1>
          </span>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-4 space-y-8">
          {/* Título e Descrição Curta */}
          <div className="w-full max-w-2xl space-y-4">
            <h1 className="text-xl font-bold">Title</h1>
            <Input
              onChange={(e) => {
                setData((baseData) => ({
                  ...baseData,
                  name: e.target.value,
                }));
              }}
              className={`w-full ${
                viewErro && (data?.name === "" || !data?.name)
                  ? "border-4 border-red-400"
                  : ""
              }`}
              placeholder="Enter your title"
            />

            <h1 className="text-xl font-bold">Short description</h1>
            <Input
              onChange={(e) => {
                setData((baseData) => ({
                  ...baseData,
                  short_description: e.target.value,
                }));
              }}
              placeholder="Enter your description"
              className={`w-full ${
                viewErro &&
                (data?.short_description === "" || !data?.short_description)
                  ? "border-4 border-red-400"
                  : ""
              }`}
            />
          </div>

          {/* Upload de Ícone */}
          <div className="w-full max-w-2xl space-y-4">
            <h1 className="text-xl font-bold">Icon upload</h1>
            <div
              onClick={openFilePicker}
              className={`border-2 border-dashed border-blueborder p-8 flex items-center justify-center cursor-pointer ${
                viewErro && (data?.logo === "" || !data?.logo)
                  ? "border-4 border-red-400"
                  : ""
              }`}
            >
              {filesContent.length >= 1 ? (
                filesContent.map((file, i) => (
                  <Image
                    width={100}
                    height={100}
                    key={i}
                    alt={file.name as string}
                    className="w-full h-full object-cover"
                    src={file.content}
                  />
                ))
              ) : (
                <div className="text-center">
                  <StickerIcon className="mx-auto" size={60} />
                  <h1>Upload your addon icon</h1>
                </div>
              )}
            </div>
          </div>

          {/* Descrição e Preview */}
          <div className="w-full max-w-2xl space-y-4">
            <h1 className="text-xl font-bold">General Description:</h1>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center space-x-2"
              >
                {isPreview ? <EditIcon size={16} /> : <EyeIcon size={16} />}
                <span>
                  {isPreview ? "Edit Description" : "Preview Markdown"}
                </span>
              </Button>
            </div>
            {isPreview ? (
              // Preview do Markdown
              <div className="w-full h-96 border-4 border-blueborder p-4 overflow-y-auto bg-black/10">
                <MarkdownRenderer
                  content={data?.description || "## Preview will appear here"}
                />
              </div>
            ) : (
              // Caixa de Descrição
              <div className="w-full">
                <div
                  className={`flex h-10 border-4 border-blueborder ${
                    viewErro && (data?.description === "" || !data?.description)
                      ? "border-red-400"
                      : ""
                  }`}
                >
                  <button
                    className="p-1 bg-bluehover/80"
                    onClick={() => applyFormatting("**")} // Negrito
                  >
                    <Bold />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("*")} // Itálico
                  >
                    <Italic />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("<u>", "</u>")} // Sublinhado
                  >
                    <Underline />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("~~")} // Tachado
                  >
                    <Strikethrough />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("`")} // Código inline
                  >
                    <CodeIcon />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={addLink} // Link
                  >
                    <LinkIcon />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={addImage} // Imagem
                  >
                    <ImageIcon />
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  value={data?.description || ""}
                  onChange={(e) => {
                    setData((baseData) => ({
                      ...baseData,
                      description: e.target.value,
                    }));
                  }}
                  className={`w-full h-96 p-2 outline-none resize-none border-4 border-t-0 border-blueborder ${
                    viewErro && (data?.description === "" || !data?.description)
                      ? "border-red-400"
                      : ""
                  }`}
                />
              </div>
            )}
          </div>

          {/* Botão de Envio */}
          <div className="w-full max-w-2xl">
            <Button
              onClick={() => {
                setViewErro(true);
                if (
                  data?.name &&
                  data?.description &&
                  data?.short_description &&
                  data?.logo
                ) {
                  addon.addAddon(
                    {
                      ...data,
                      id: data.name.toLowerCase().replace(/ /g, ""),
                      likes: 0,
                      tags: "",
                      status: 100,
                    } as Addon,
                    session?.user.email as string
                  );
                  setSendSucess(true);
                }
              }}
              className="w-full"
            >
              Submit Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
