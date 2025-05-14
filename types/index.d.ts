export type User = {
  id: string;
  bio: string;
  banner: string;
  image: string;
  name: string;
  display_name: string;
  role: string;
  email: string;
  likes_posts: string[];
};



export type Addon = {
  data_post: number;
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
    gallery: { name: string; url: string }[];
};
