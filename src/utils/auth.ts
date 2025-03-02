import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import { user } from "./db";

export const { auth, handlers, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Discord,
  ],
  callbacks: {
    async session({ session }) {
      if (session.user.name) {
        const userFind = await user.findUser({
          id: session.user.email,
        });
        console.log(userFind);
        if (!userFind) {
          user.addUser({
            id: session.user.email,
            name: session.user.name,
            display_name: session.user.name,
            image: session.user.image,
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
  trustHost: true,
});
