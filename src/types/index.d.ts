export type User = {
  id?: string;
  bio?: string;
  banner?: string;
  image?: string;
  name?: string;
  display_name?: string;
  role?: string;
  email?: string;
};

/*
@params Addon
        status = 100 = "Aprovado"
                 200 = "Enviado"
                 300 = "Recusado"
*/

export type Addon = {
  id: string;
  name: string;
  description: string;
  short_description: string;
  download_link: string;
  tags: string;
  logo: string;
  post: number;
  status: 100 | 200 | 300;
  likes: number;
  downloads: { name: string; link: string; url: string }[];
  author: string;
};
