import HomePage from "@/components/HomePage";
import { auth } from "@/utils/auth";
import { addon } from "@/utils/db";
import Head from "next/head";

export default async function Main() {
  const addons = await addon.getAll();

  const session = await auth();

  console.log(session);

  return (
    <div>
      <Head>
        <title>Rock Mine</title>
        <link rel="icon" href="/logo.jpg" type="image/x-icon" />
      </Head>
      <HomePage addons={addons} />
    </div>
  );
}
