import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import EmailFormList from "@/components/admin/EmailFormList";

export default async function AdminEmailForm() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/admin/login");
  }

  return <EmailFormList />;
}
