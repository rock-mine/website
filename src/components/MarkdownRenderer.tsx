import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; //remark-gfm rehype-raw rehype-highlight
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
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
      }}
      skipHtml={false}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
