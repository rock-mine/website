import { auth } from "@/utils/auth";
import "./global.css";
import Menu from "@/components/Menu";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html>
      <body>
        <Menu session={session} />
        <main>{children}</main>
      </body>
    </html>
  );
}
