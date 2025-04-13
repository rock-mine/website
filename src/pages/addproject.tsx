import { useSession } from "next-auth/react";
import Input from "src/components/Input";
import { useFilePicker } from "use-file-picker";
import Link from "next/link";
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
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  PlusIcon,
  TriangleAlert,
  YoutubeIcon,
} from "lucide-react";
import Button from "src/components/Button";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { addon } from "src/utils/db";
import type { Addon } from "types";
import MarkdownRenderer from "src/components/MarkdownRenderer";
import tags from "@/extras/tags.json";
import Head from "next/head";

type AddonBaseConfig = {
  name?: string;
  short_description?: string;
  description?: string;
  logo?: string;
  tags?: string[];
  downloads?: { name: string; link: string }[];
};

export default function AddProject() {
  const { data: session } = useSession();
  const [data, setData] = useState<AddonBaseConfig | null>();
  const [viewErro, setViewErro] = useState(false);
  const [viewSucessSend, setSendSucess] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<{ name: string; link: string }[]>(
    []
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  // Função para validar URLs do YouTube
  /*const isValidYouTubeUrl = (url: string): boolean => {
    const youtubeDomains = [
      "www.youtube.com",
      "youtube.com",
      "youtu.be",
      "www.youtu.be",
    ];
    try {
      const parsedUrl = new URL(url);
      return youtubeDomains.includes(parsedUrl.hostname);
    } catch (_) {
      return false; // URL inválida
    }
  };*/

  const convertToYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      const videoId = parsedUrl.searchParams.get("v"); // Extrai o ID do vídeo
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`; // Retorna a URL de embed
      } else if (parsedUrl.hostname.includes("youtu.be")) {
        // Para URLs encurtadas (youtu.be)
        return `https://www.youtube.com/embed${parsedUrl.pathname}`;
      }
      return null; // URL inválida
    } catch (e) {
      return e ? null : "";
    }
  };

  const addYouTubeIframe = () => {
    const url = prompt("Digite a URL do vídeo do YouTube:");
    if (url) {
      const embedUrl = convertToYouTubeEmbedUrl(url); // Converte para embed
      if (embedUrl) {
        const iframeMarkdown = `<iframe src="${embedUrl}" title="YouTube video player" sandbox="allow-scripts allow-same-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="w-full h-64 border-none rounded-md my-4"></iframe>`;
        applyFormatting(iframeMarkdown, "");
      } else {
        alert("Por favor, insira uma URL válida do YouTube.");
      }
    }
  };

  // Função para aplicar formatação
  const applyFormatting = (prefix: string, suffix: string = prefix) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = data?.description || "";

    const newText =
      text.substring(0, start) +
      `${prefix}${text.substring(start, end)}${suffix}` +
      text.substring(end);

    setData((baseData) => ({
      ...baseData,
      description: newText,
    }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  // Funções de formatação
  const addLink = () => {
    const url = prompt("Digite a URL:");
    if (url) {
      applyFormatting("[", `](${url})`);
    }
  };

  const addImage = () => {
    const url = prompt("Digite a URL da imagem:");
    if (url) {
      const altText = prompt("Digite o texto alternativo (alt):");
      applyFormatting(`![${altText || "imagem"}]`, `(${url})`);
    }
  };

  const addHeading = (level: number) => {
    const prefix = "#".repeat(level) + " ";
    applyFormatting(prefix, "");
  };

  const addList = (ordered: boolean) => {
    const prefix = ordered ? "1. " : "- ";
    applyFormatting(prefix, "");
  };

  const addBlockquote = () => {
    applyFormatting("> ", "");
  };

  const addCodeBlock = () => {
    applyFormatting("```\n", "\n```");
  };

  const handleTagChange = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleAddDownload = () => {
    setDownloads((prevDownloads) => [...prevDownloads, { name: "", link: "" }]);
  };

  const handleRemoveDownload = (index: number) => {
    setDownloads((prevDownloads) =>
      prevDownloads.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="mt-20">
      <Head>
        <title>Upload project</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
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
          <div className="flex items-center w-full justify-center">
            <Link
              href="/tutorial"
              className="text-blueborder hover:text-bluetext bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md"
            >
              <div className="flex items-center gap-2">
                <span>Need Help? Click here to see tutorial</span>
                <TriangleAlert />
              </div>
            </Link>
          </div>
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
                  {/* Botões de formatação */}
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("**")}
                    title="Negrito"
                  >
                    <Bold />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("*")}
                    title="Itálico"
                  >
                    <Italic />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("<u>", "</u>")}
                    title="Sublinhado"
                  >
                    <Underline />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("~~")}
                    title="Tachado"
                  >
                    <Strikethrough />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => applyFormatting("`")}
                    title="Código inline"
                  >
                    <CodeIcon />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={addLink}
                    title="Adicionar link"
                  >
                    <LinkIcon />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={addImage}
                    title="Adicionar imagem"
                  >
                    <ImageIcon />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => addHeading(1)}
                    title="Título 1"
                  >
                    <Heading1 />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => addHeading(2)}
                    title="Título 2"
                  >
                    <Heading2 />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => addHeading(3)}
                    title="Título 3"
                  >
                    <Heading3 />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => addList(false)}
                    title="Lista não ordenada"
                  >
                    <List />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={() => addList(true)}
                    title="Lista ordenada"
                  >
                    <ListOrdered />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={addBlockquote}
                    title="Citação"
                  >
                    <Quote />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={addCodeBlock}
                    title="Bloco de código"
                  >
                    <CodeIcon />
                  </button>
                  <button
                    className="p-1 hover:bg-bluehover/80"
                    onClick={addYouTubeIframe}
                    title="Inserir vídeo do YouTube"
                  >
                    <YoutubeIcon />
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

          {/* Seleção de Tags */}
          <div className="w-full max-w-2xl space-y-4">
            <h1 className="text-xl font-bold">Tags</h1>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagChange(tag)}
                  className={`px-3 py-1 border-blueborder border-4 ${
                    selectedTags.includes(tag)
                      ? "bg-blueselected text-bluetext"
                      : "bg-bluebg text-bluetext hover:bg-bluehover"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Links de Download */}
          <div className="w-full max-w-2xl space-y-4">
            <h1 className="text-xl font-bold">Download Links</h1>
            <div className="space-y-2">
              {downloads.map((download, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={download.name}
                    onChange={(e) => {
                      const newDownloads = [...downloads];
                      newDownloads[index].name = e.target.value;
                      setDownloads(newDownloads);
                    }}
                    placeholder="Download Name"
                  />
                  <Input
                    value={download.link}
                    onChange={(e) => {
                      const newDownloads = [...downloads];
                      newDownloads[index].link = e.target.value;
                      setDownloads(newDownloads);
                    }}
                    placeholder="Download Link"
                  />
                  <button
                    onClick={() => handleRemoveDownload(index)}
                    className="bg-black/30 border-2 border-bluetext hover:bg-red-600/30 rounded-md text-white px-2 py-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddDownload}
              className="flex items-center justify-center space-x-2 bg-black/30 border-2 border-bluetext hover:bg-bluehover/40 rounded-md text-white px-1 py-1"
            >
              <span>Add Download Link</span>
              <PlusIcon size={16} />
            </button>
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
                      tags: selectedTags.join(", "),
                      status: 100,
                      downloads: downloads,
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
