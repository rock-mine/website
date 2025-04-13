import type { SupabaseClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";

/*

*/
export default function Main(supabase: SupabaseClient) {
  return {
    async getAll() {
      const { data } = await supabase.storage.from("images").list("./");

      return data;
    },
    async getById(filename: string) {
      const { data } = await supabase.storage
        .from("images")
        .getPublicUrl(filename);

      return data;
    },
    async updateImg(file: string, base64: string) {
      const { data } = await supabase.storage
        .from("images")
        .update(file, decode(base64), {
          contentType: "image/png",
        });

      return data;
    },

    async addImage(file: string, base64: string) {
      const { data } = await supabase.storage
        .from("images")
        .upload(file, decode(base64), {
          contentType: "image/png",
        });
      return data;
    },
  };
}
