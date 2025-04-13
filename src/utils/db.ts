import { createClient } from "@supabase/supabase-js";
import AddonMain from "./db/addon";
import UserMain from "./db/user";
import ImageMain from "./db/images";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const user = UserMain(supabase);
const addon = AddonMain(supabase);
const image = ImageMain(supabase);

export { user, addon, image };
