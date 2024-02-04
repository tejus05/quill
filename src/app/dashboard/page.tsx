import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from '@/db'
import Dashboard from "@/components/Dashboard";

const DashboardPage = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect('/auth-callback?origin=dashboard');
  }

  const dbUser = await prisma.user.findFirst({
    where: {
      id: user.id
    }
  })

  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
  }

  return <Dashboard/>
}

export default DashboardPage