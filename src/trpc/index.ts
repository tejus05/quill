import prisma from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { z } from 'zod';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
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

    return { success: true }
  }),
  getUserFiles: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    return await prisma.file.findMany({
      where: {
        userId
      }
    })
  }),
  deleteFile: privateProcedure.input(z.object({
    id: z.string()
  })).mutation(async ({ ctx, input }) => {
    const { userId } = ctx;

    const file = await prisma.file.findFirst({
      where: {
        id: input.id,
        userId
      }
    })

    if (!file) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }

    await prisma.file.delete({
      where: {
        id: file.id
      }
    })

    return file;

  }),
  getFile: privateProcedure.input(z.object({
    key:z.string()
  })).mutation(async({input,ctx}) => {
    const { userId } = ctx;

    const file = await prisma.file.findFirst({
      where: {
        userId,
        key: input.key
      }
    })

    if (!file) {
      throw new TRPCError({code: "NOT_FOUND"})
    }

    return file;
  })
}) 

export type AppRouter = typeof appRouter;