import { publicProcedure, router } from './trpc'
import { TRPCError } from '@trpc/server';
import prisma from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

export const appRouter = router({
  authCallback: publicProcedure.query(async() => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const dbUser = await prisma.user.findFirst({
      where: {
        id: user.id
      }
    })

    //eventual consistency
    if (!dbUser) {
      await prisma.user.create({
        data: {
          id: user.id,
          email: user.email
        }
      })
    }

    return {success: true}
  })
}) 

export type AppRouter = typeof appRouter;