import NextAuth, { type AuthOptions } from "next-auth";
import { supabase, user } from "./db";
import Discord from "next-auth/providers/discord";

export const authOptions: AuthOptions = {
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID!,
      clientSecret: process.env.AUTH_DISCORD_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user.email && session.user.name) {
        const userFind = await user.findUser("id", session.user.email);
        console.log(userFind);
        if (!userFind) {
          fetch(session.user.image!).then(async (res) => {
            supabase.storage
              .from("logos")
              .upload(
                `${session.user!.name!.toLowerCase().replaceAll(" ", "")}`,
                await res.arrayBuffer(),
                {
                  contentType: "image/png",
                }
              );
          });

          user.addUser({
            id: session.user.email,
            name: session.user.name.toLowerCase(),
            display_name: session.user.name,
            image: `/api/image/${session
              .user!.name!.toLowerCase()
              .replaceAll(" ", "")}.png`,
            email: session.user.email,
          });
          session.user.id = session.user.email;
          session.user.display_name = session.user.name;
          session.user.image = session.user.image;
          session.user.role = "";
        } else {
          Object(session).user = userFind;
          return session;
        }
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
};
export const NextAuthApi = NextAuth(authOptions);
