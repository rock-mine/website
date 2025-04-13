import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { image } = req.query;

  if (typeof image !== "string") {
    return res.status(400).json({ error: "Arquivo inválido" });
  }
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images//${image}`;

  const response = await fetch(imageUrl);

  if (!response.ok) {
    return res.status(500).json({ error: "Erro ao baixar imagem" });
  }

  const contentType =
    response.headers.get("content-type") || "application/octet-stream";
  const contentLength = response.headers.get("content-length");

  res.setHeader("Content-Type", contentType);
  if (contentLength) res.setHeader("Content-Length", contentLength);

  const buffer = await response.arrayBuffer();
  res.status(200).send(Buffer.from(buffer));
}
