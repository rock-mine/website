import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
}


const isValidYouTubeUrl = (url: string): boolean => {
  const youtubeDomains = [
    "www.youtube.com",
    "youtube.com",
    "youtu.be",
    "www.youtu.be",
    "open.spotify.com",
  ];
  try {
    const parsedUrl = new URL(url);
    return youtubeDomains.includes(parsedUrl.hostname);
  } catch (e) {
    return false; 
  }
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const sanitizeSchema = {
    tagNames: [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p", "a", "ul", "ol", "li",
      "code", "pre", "blockquote", "img",
      "table", "th", "td", "tr", "br",
      "strong", "em", "hr", "div", "span",
      "iframe", 
    ],
    attributes: {
      "*": ["className", "style"],
      a: ["href", "target", "rel"],
      img: ["src", "alt", "title"],
      iframe: ["src", "title", "width", "height", "allow", "sandbox"], 
    },
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        rehypeRaw,
        [rehypeSanitize, sanitizeSchema],
        rehypeHighlight,
      ]}
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-4xl font-bold my-6" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="text-3xl font-bold my-5" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="text-2xl font-bold my-4" {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className="text-xl font-bold my-3" {...props} />
        ),
        h5: ({ ...props }) => (
          <h5 className="text-lg font-bold my-2" {...props} />
        ),
        h6: ({ ...props }) => (
          <h6 className="text-base font-bold my-1" {...props} />
        ),
        p: ({ ...props }) => (
          <p className="text-base my-4 leading-relaxed" {...props} />
        ),
        a: ({ ...props }) => (
          <a
            className="text-bluetext hover:text-blueborder underline"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        ),
        ul: ({ ...props }) => (
          <ul className="list-disc list-inside my-4" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal list-inside my-4" {...props} />
        ),
        li: ({ ...props }) => <li className="my-2" {...props} />,
        code: ({ children, ...props }) => (
          <pre className="bg-black/20 p-4 rounded-md overflow-x-auto my-4">
            <code className="text-sm font-mono" {...props}>
              {children}
            </code>
          </pre>
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 border-gray-400 pl-4 my-4 text-gray-600 italic"
            {...props}
          />
        ),
        img: ({ ...props }) => (
          <img
            alt="Markdown image"
            className="max-w-full h-auto rounded-md my-4 justify-center"
            {...props}
          />
        ),
        table: ({ ...props }) => (
          <table className="w-full border-collapse my-4" {...props} />
        ),
        th: ({ ...props }) => (
          <th
            className="border border-gray-400 px-4 py-2 bg-gray-100"
            {...props}
          />
        ),
        td: ({ ...props }) => (
          <td className="border border-gray-400 px-4 py-2" {...props} />
        ),
        // Componente iframe personalizado
        iframe: ({ src, title, ...props }) => {
          if (src && isValidYouTubeUrl(src)) {
            return (
              <iframe
                src={src}
                title={title}
                sandbox="allow-scripts allow-same-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="w-full h-64 border-none rounded-md my-4"
                {...props}
              />
            );
          }
          return null; // Não renderiza iframes de fontes não autorizadas
        },
      }}
      skipHtml={false}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;