import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import Head from "next/head";
export default function TutorialPage() {
  return (
    <div className="mt-20  h-full w-full overflow-auto">
      <Head>
        <title>Tutorial</title>
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <div className="flex items-center w-full justify-center">
        <Link
          href="/addproject"
          className="text-blueborder hover:text-bluetext bg-gray-500/5 transition-colors hover:bg-bluehover/20 px-3 py-2 rounded-md"
        >
          <div className="flex items-center gap-2">
            <span>Back to Project Page</span>
            <TriangleAlert />
          </div>
        </Link>
      </div>
      <div className="max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
        {/* Título */}
        <h1 className="text-3xl font-bold text-center mb-6">
          Tutorial: Como Usar a Seção General Description
        </h1>

        {/* Introdução */}
        <p className="text-lg mb-6">
          A seção <strong>General Description</strong> permite que você escreva
          uma descrição detalhada do seu projeto usando{" "}
          <strong>Markdown</strong>. Abaixo, explicamos como usar os botões de
          formatação, o modo de preview e as funcionalidades disponíveis.
        </p>

        {/* Funcionalidades Disponíveis */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            🛠️ Funcionalidades Disponíveis
          </h2>

          <h3 className="text-xl font-semibold mb-2">
            1. Botões de Formatação
          </h3>
          <p className="mb-4">
            Na parte superior da caixa de texto, você encontrará vários botões
            para aplicar formatação ao seu texto. Aqui está o que cada um faz:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Negrito</strong>: Adiciona{" "}
              <code>**texto em negrito**</code>.
            </li>
            <li>
              <em>Itálico</em>: Adiciona <code>*texto em itálico*</code>.
            </li>
            <li>
              <s>Tachado</s>: Adiciona <code>~~texto tachado~~</code>.
            </li>
            <li>
              <code>Código inline</code>: Adiciona <code>`código inline`</code>.
            </li>
            <li>
              <a
                href="https://exemplo.com"
                className="text-blue-500 hover:underline"
              >
                Link
              </a>
              : Adiciona <code>[texto](url)</code>.
            </li>
            <li>
              <img
                src="https://exemplo.com/imagem.jpg"
                alt="Imagem de exemplo"
                className="inline-block h-6 w-6"
              />
              : Adiciona <code>![alt](url)</code>.
            </li>
            <li>
              <strong>Títulos</strong>: Adiciona títulos com{" "}
              <code># Título 1</code>, <code>## Título 2</code> ou{" "}
              <code>### Título 3</code>.
            </li>
            <li>
              <strong>Listas</strong>:
              <ul className="list-disc pl-6 mt-2">
                <li>
                  Não ordenada: Adiciona <code>- item</code>.
                </li>
                <li>
                  Ordenada: Adiciona <code>1. item</code>.
                </li>
              </ul>
            </li>
            <li>
              <strong>Citação</strong>: Adiciona{" "}
              <code>&gt; texto de citação</code>.
            </li>
            <li>
              <strong>Bloco de código</strong>: Adiciona{" "}
              <code>```código```</code>.
            </li>
            <li>
              <strong>Vídeo do YouTube</strong>: Insere um iframe para vídeos do
              YouTube.
            </li>
          </ul>
        </section>

        {/* Modo de Preview */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-2">2. Modo de Preview</h3>
          <p className="mb-4">
            No canto superior direito, há um botão para alternar entre o modo de{" "}
            <strong>edição</strong> e o modo de <strong>preview</strong>.
          </p>
          <ul className="list-disc pl-6">
            <li>
              <strong>Modo de Edição</strong>: Permite que você escreva e
              formate o texto.
            </li>
            <li>
              <strong>Modo de Preview</strong>: Exibe como o texto formatado
              será renderizado.
            </li>
          </ul>
        </section>

        {/* Exemplos de Uso */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📝 Exemplos de Uso</h2>

          <h3 className="text-xl font-semibold mb-2">
            Exemplo 1: Títulos e Texto
          </h3>
          <pre className=" p-4 rounded-md mb-4">
            <code>
              {`# Título 1
## Título 2
### Título 3

Este é um exemplo de texto com **negrito**, *itálico* e ~~tachado~~.`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold mb-2">Exemplo 2: Listas</h3>
          <pre className=" p-4 rounded-md mb-4">
            <code>
              {`- Item 1
- Item 2
- Item 3

1. Primeiro item
2. Segundo item
3. Terceiro item`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold mb-2">
            Exemplo 3: Links e Imagens
          </h3>
          <pre className=" p-4 rounded-md mb-4">
            <code>
              {`[Clique aqui](https://exemplo.com) para visitar o site.

![Imagem de exemplo](https://exemplo.com/imagem.jpg)`}
            </code>
          </pre>

          <h3 className="text-xl font-semibold mb-2">
            Exemplo 4: Bloco de Código
          </h3>
          <pre className=" p-4 rounded-md mb-4">
            <code>
              {`\`\`\`javascript
function exemplo() {
  console.log("Olá, mundo!");
}
\`\`\``}
            </code>
          </pre>

          <h3 className="text-xl font-semibold mb-2">
            Exemplo 5: Vídeo do YouTube
          </h3>

          <code className="text-sm items-center">
            {`<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="YouTube video player" sandbox="allow-scripts allow-same-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" class="w-full h-64 border-none rounded-md my-4"></iframe>`}
          </code>
        </section>

        {/* Dicas Rápidas */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">🚀 Dicas Rápidas</h2>
          <ul className="list-disc pl-6">
            <li>
              Use <strong>negrito</strong> e <em>itálico</em> para destacar
              informações importantes.
            </li>
            <li>
              Organize o conteúdo com <strong>títulos</strong> e{" "}
              <strong>listas</strong>.
            </li>
            <li>
              Adicione <strong>links</strong> e <strong>imagens</strong> para
              enriquecer a descrição.
            </li>
            <li>
              Use o <strong>modo de preview</strong> para verificar como o texto
              será exibido.
            </li>
          </ul>
        </section>

        {/* Problemas Comuns */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">⚠️ Problemas Comuns</h2>
          <ul className="list-disc pl-6">
            <li>
              <strong>Formatação não aplicada</strong>: Certifique-se de
              selecionar o texto antes de clicar nos botões de formatação.
            </li>
            <li>
              <strong>Imagens ou links quebrados</strong>: Verifique se as URLs
              estão corretas.
            </li>
            <li>
              <strong>Preview não atualizado</strong>: Clique no botão de
              preview novamente para atualizar a visualização.
            </li>
          </ul>
        </section>

        {/* Conclusão */}
        <section>
          <h2 className="text-2xl font-bold mb-4">🎉 Conclusão</h2>
          <p className="text-lg">
            Agora você sabe como usar a seção{" "}
            <strong>General Description</strong>! Com os botões de formatação e
            o modo de preview, você pode criar descrições ricas e bem
            organizadas para o seu projeto.
          </p>
          <p className="text-lg mt-2">
            Se tiver dúvidas, consulte este tutorial novamente ou entre em
            contato com o suporte.
          </p>
        </section>
      </div>
    </div>
  );
}
