import type { SupabaseClient } from "@supabase/supabase-js";
import type { Addon } from "types";
import { decode } from "base64-arraybuffer";

export function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

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
      const idIcon = generateUUID();

      await supabase.storage
        .from("images")
        .upload(`${idIcon}`, decode(baseAddon.logo.split("base64,")[1]), {
          contentType: "image/png",
        });

      const { data } = await supabase
        .from("addons")
        .insert({
          ...baseAddon,
          data_post: Date.now(),
          logo: `/api/image/${idIcon}`,
          author,
        })
        .select();
      return data;
    },
    async setAddonState(data: object, id: string) {
      const { error } = await supabase.from("addons").update(data).eq("id", id);

      return error;
    },
  };
}
