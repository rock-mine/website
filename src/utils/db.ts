import { createClient } from "@supabase/supabase-js";
import AddonMain from "./db/addon";
import UserMain from "./db/user";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const user = UserMain(supabase);
const addon = AddonMain(supabase);

export { user, addon };
