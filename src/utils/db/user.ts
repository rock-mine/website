import type { SupabaseClient } from "@supabase/supabase-js";
import type { User } from "@/types";

export default function Main(supabase: SupabaseClient) {
  return {
    async addUser(opts: User) {
      // delete opts?.avatar;
      const { data, error } = await supabase
        .from("users")
        .insert({ role: "", ...opts })
        .select();

      console.log("add user error: " + JSON.stringify(error));
      console.log(data);
      return data;
    },
    async findUser(opts: { id: string }): Promise<User> {
      const { data } = await supabase.from("users").select();
      return data?.find((v) => v.id === opts.id);
    },
    async updateUser(id: string, newValue: User) {
      const { error } = await supabase
        .from("users")
        .update(newValue)
        .eq("id", id);

      console.log(error);
    },
  };
}
