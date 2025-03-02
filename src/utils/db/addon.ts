import type { SupabaseClient } from "@supabase/supabase-js";
import type { Addon, User } from "@/types";
import { decode } from "base64-arraybuffer";

export default function Main(supabase: SupabaseClient) {
  return {
    async getAll(): Promise<Addon[]> {
      const { data } = await supabase.from("addons").select();
      return data as Addon[];
    },
    async getById(id: string): Promise<Addon> {
      const { data } = await supabase.from("addons").select().eq("id", id);

      return (data ? data[0] : {}) as Addon;
    },
    async addAddon(addon: Addon, author: string) {
      const baseAddon: Addon = addon;

      try {
        await supabase.storage
          .from("logos")
          .upload(
            `${addon.id}.png`,
            decode(baseAddon.logo.split("base64,")[1]),
            {
              contentType: "image/png",
            }
          );
      } catch (error) {
        console.log(error);
      }

      const { data, error } = await supabase
        .from("addons")
        .insert({
          ...baseAddon,
          logo: `https://gpvzyqfhcdfuaksujvwo.supabase.co/storage/v1/object/public/logos//${addon.id}.png`,
          author,
        })
        .select();

      console.log(data);

      console.log(error);

      return data;
    },
  };
}
