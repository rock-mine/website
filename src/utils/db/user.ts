import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "types";

export default function Main(supabase: SupabaseClient) {
  return {
    async addUser(opts: User) {
      // delete opts?.avatar;
      const { data } = await supabase
        .from("users")
        .insert({ ...opts, role: " " })
        .select();

      return data;
    },
    async findUser(name: string, value: string): Promise<User> {
      const { data } = await supabase.from("users").select().eq(name, value);
      return data ? data[0] : ({} as User);
    },
    async updateUser(id: string, newValue: object | User | undefined) {
      await supabase.from("users").update(newValue).eq("id", id);
    },
  };
}
