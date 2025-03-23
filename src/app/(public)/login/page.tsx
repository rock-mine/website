import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";
import ButtonsLogins from "../../../components/buttons-login";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user.name) redirect("/me");

  return (
    <div className="w-full grid justify-center mt-20">
      <section className="w-full max-w-[1500vw] items-center justify-center text-white flex overflow-x-hidden">
        <div className="grid space-y-4">
          <ButtonsLogins />
        </div>
      </section>
    </div>
  );
}
