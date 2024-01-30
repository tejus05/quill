import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect('/auth-callback?origin=dashboard');
  }

  

  return (
    <div>
      
    </div>
  )
}

export default Dashboard