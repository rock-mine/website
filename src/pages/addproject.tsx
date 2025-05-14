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
  Loader,
  Minus,
  AlertCircle,
} from "lucide-react";
import Button from "src/components/Button";
import { useRef, useState } from "react";
import Image from "next/image";
import { addon } from "src/utils/db";
import type { Addon } from "types";
import MarkdownRenderer from "src/components/MarkdownRenderer";
import tags from "@/extras/tags.json";
import Head from "next/head";
import { z } from "zod";

const linkSchema = z.array(
  z.object({
    name: z.string().min(10),
    link: z.string().url(),
  })
);

const imageSchema = z.array(
  z.object({
    name: z.string().min(5),
    url: z.string().url(),
  })
);

const addonSchema = z.object({
  name: z.string().min(4),
  short_description: z.string().min(10),
  description: z.string().min(40),
  logo: z.string().min(4),
});

type AddonBaseConfig = {
  name?: string;
  short_description?: string;
  description?: string;
  logo?: string;
  tags?: string[];
  downloads?: { name: string; link: string }[];
  gallery?: { name: string; url: string }[];
};

export default function AddProject() {
  const { data: session } = useSession();
  const [data, setData] = useState<AddonBaseConfig>({});
  const [viewErro, setViewErro] = useState(false);
  const [startSucess, setStartSucess] = useState(false);
  const [viewSucessSend, setSendSucess] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [downloads, setDownloads] = useState<{ name: string; link: string }[]>([]);
  const [galleryImages, setGalleryImages] = useState<{ name: string; url: string }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // File picker for logo
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

  // File picker for gallery images
  const { openFilePicker: openGalleryPicker } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    maxFileSize: 5, // 5MB
    validators: [
    ],
    onFilesSuccessfullySelected: ({ filesContent }) => {
      const newImages = [...galleryImages];
      filesContent.forEach((file, index) => {
        if (!newImages[index]) {
          newImages[index] = { name: "", url: file.content };
        } else {
          newImages[index].url = file.content;
        }
      });
      setGalleryImages(newImages);
    },
  });

  // Gallery image functions
  const handleAddGalleryImage = () => {
    if (galleryImages.length >= 12) return;
    setGalleryImages([...galleryImages, { name: "", url: "" }]);
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleGalleryImageChange = (index: number, field: 'name' | 'url', value: string) => {
    const newImages = [...galleryImages];
    newImages[index][field] = value;
    setGalleryImages(newImages);
  };

  const convertToYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const parsedUrl = new URL(url);
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed${parsedUrl.pathname}`;
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  const addYouTubeIframe = () => {
    const url = prompt("Digite a URL do vídeo do YouTube:");
    if (url) {
      const embedUrl = convertToYouTubeEmbedUrl(url);
      if (embedUrl) {
        const iframeMarkdown = `<iframe src="${embedUrl}" title="YouTube video player" sandbox="allow-scripts allow-same-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="w-full h-64 border-none rounded-md my-4"></iframe>`;
        applyFormatting(iframeMarkdown, "");
      } else {
        alert("Por favor, insira uma URL válida do YouTube.");
      }
    }
  };

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
    setDownloads([...downloads, { name: "", link: "" }]);
  };

  const handleRemoveDownload = (index: number) => {
    setDownloads(downloads.filter((_, i) => i !== index));
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
                viewErro && !z.string().min(4).safeParse(data?.name).success
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
                !z.string().min(10).safeParse(data?.short_description).success
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
              <div className="w-full h-96 border-4 border-blueborder p-4 overflow-y-auto bg-black/10">
                <MarkdownRenderer
                  content={data?.description || "## Preview will appear here"}
                />
              </div>
            ) : (
              <div className="w-full">
                <div
                  className={`flex h-10 border-4 border-blueborder ${
                    viewErro &&
                    !z.string().min(40).safeParse(data?.description).success
                      ? "border-red-400"
                      : ""
                  }`}
                >
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
                    viewErro &&
                    !z.string().min(40).safeParse(data?.description).success
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
              {tags.addons.map((tag) => (
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
            <span className="flex relative gap-2 items-center justify-center">
              {viewErro &&
                (!downloads[0] ||
                  (downloads[0] &&
                    !linkSchema.safeParse(downloads[0]).success)) && (
                  <div
                    data-tooltip={`Needs at least one valid link`}
                    className={`relative whitespace-nowrap w-fit h-fit after:content-[attr(data-tooltip)] after:absolute after:left-2/4 after:translate-x-[-50%] after:bottom-[100%] after:text-[13px] after:rounded-lg after:text-white after:invisible hover:after:visible`}
                  >
                    <AlertCircle className="text-red-400" />
                  </div>
                )}
              <h1 className="text-xl font-bold">Download Links</h1>
            </span>
            <div className="space-y-2 justify-items-center">
              {downloads.map((download, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    className={
                      viewErro &&
                      !z.string().min(10).safeParse(downloads[index].name)
                        .success
                        ? "border-2 border-red-500"
                        : ""
                    }
                    value={download.name}
                    onChange={(e) => {
                      const newDownloads = [...downloads];
                      newDownloads[index].name = e.target.value;
                      setDownloads(newDownloads);
                    }}
                    placeholder="Download Name"
                  />
                  <Input
                    className={
                      viewErro &&
                      !z.string().url().safeParse(downloads[index].link).success
                        ? "border-2 border-red-500"
                        : ""
                    }
                    value={download.link}
                    onChange={(e) => {
                      const newDownloads = [...downloads];
                      newDownloads[index].link = e.target.value;
                      setDownloads(newDownloads);
                    }}
                    placeholder="Download Link"
                  />
                  <Button
                    onClick={() => handleRemoveDownload(index)}
                    className="border-3 p-0 h-10 w-10 border-red-400"
                  >
                    <Minus />
                  </Button>
                </div>
              ))}
            </div>
            <Button onClick={handleAddDownload} className="gap-2 px-1 py-0">
              <p className="pl-1">Add Download Link</p>
              <PlusIcon size={30} />
            </Button>
          </div>

          {/* Galeria de Imagens */}
          <div className="w-full max-w-2xl space-y-4">
            <span className="flex relative gap-2 items-center justify-center">
              {viewErro && galleryImages.length > 0 && !imageSchema.safeParse(galleryImages).success && (
                <div
                  data-tooltip={`Image names must be at least 5 characters and URLs must be valid`}
                  className={`relative whitespace-nowrap w-fit h-fit after:content-[attr(data-tooltip)] after:absolute after:left-2/4 after:translate-x-[-50%] after:bottom-[100%] after:text-[13px] after:rounded-lg after:text-white after:invisible hover:after:visible`}
                >
                  <AlertCircle className="text-red-400" />
                </div>
              )}
              <h1 className="text-xl font-bold">Gallery Images (Max 12)</h1>
              <span className="text-sm text-gray-500">
                {galleryImages.length}/12
              </span>
            </span>
            <div className="space-y-2">
              {galleryImages.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <Input
                      value={image.name}
                      onChange={(e) => handleGalleryImageChange(index, 'name', e.target.value)}
                      placeholder="Image title"
                      className={viewErro && !z.string().min(5).safeParse(image.name).success ? "border-red-500" : ""}
                    />
                    <div className="flex gap-2">
                      <Input
                        value={image.url}
                        onChange={(e) => handleGalleryImageChange(index, 'url', e.target.value)}
                        placeholder="Image URL"
                        className={viewErro && !z.string().url().safeParse(image.url).success ? "border-red-500" : ""}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          const inputIndex = index;
                          openGalleryPicker();
                        }}
                        className="whitespace-nowrap"
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleRemoveGalleryImage(index)}
                    className="border-3 p-0 h-10 w-10 border-red-400"
                  >
                    <Minus />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              onClick={handleAddGalleryImage}
              disabled={galleryImages.length >= 12}
              className="gap-2 px-1 py-0"
            >
              <p className="pl-1">Add Gallery Image</p>
              <PlusIcon size={30} />
            </Button>

            {/* Pré-visualização da galeria */}
            {galleryImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {galleryImages.map((image, index) => (
                  image.url && (
                    <div key={index} className="relative group">
                      <img
                        src={image.url}
                        alt={image.name || `Gallery image ${index + 1}`}
                        className="w-full h-24 object-cover rounded border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="text-white text-xs text-center p-1 truncate w-full">
                          {image.name}
                        </span>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </div>

          {/* Botão de Envio */}
          <div className="w-full max-w-2xl">
            <Button
              onClick={async () => {
                if (startSucess) return;
                setViewErro(true);
                if (
                  downloads[0] &&
                  data.name &&
                  addonSchema.safeParse(data).success &&
                  linkSchema.safeParse(downloads).success &&
                  (galleryImages.length === 0 || imageSchema.safeParse(galleryImages).success)
                ) {
                  setStartSucess(true);
                  await addon.addAddon(
                    {
                      ...data,
                      id: data.name.toLowerCase().replace(/ /g, ""),
                      likes: 0,
                      tags: selectedTags.join(", "),
                      status: 100,
                      downloads: downloads,
                      gallery: galleryImages,
                    } as Addon,
                    session?.user.email as string
                  );
                  setSendSucess(true);
                }
              }}
              className={`${
                startSucess
                  ? "opacity-50 cursor-not-allowed shadow-none hover:text-white"
                  : ""
              } gap-5 w-full`}
            >
              {startSucess && <Loader className="animate-spin" />}
              Submit Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}