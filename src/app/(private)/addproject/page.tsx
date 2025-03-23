import AddProject from "@/components/pages/AddProject";
import { auth } from "@/utils/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload project",
  icons: "/logo.jpg",
};

export default async function AddProjectPage() {
  const session = await auth();
  // if (!session?.user.role?.includes("creator")) redirect("/");
  //pega commit fdp
  return <AddProject session={session} />;
}
