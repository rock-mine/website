import "../global.css";
import Menu from "@/components/Menu";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
  return (
    <SessionProvider session={session}>
      <Menu />
      <main className="">
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
}
