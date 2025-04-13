import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);
  const { image } = req.query;

  console.log(image);
  if (typeof image !== "string") {
    return res.status(400).json({ error: "Arquivo inválido" });
  }
  const imageUrl = `https://gpvzyqfhcdfuaksujvwo.supabase.co/storage/v1/object/public/logos//${image}.png`;
  console.log(imageUrl);

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
