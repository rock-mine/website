import AddProject from "@/components/pages/AddProject";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function AddProjectPage() {
  const session = await auth();
  if (!session?.user.role?.includes("creator")) redirect("/");
  return <AddProject session={session} />;
}
