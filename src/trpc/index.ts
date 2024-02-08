import prisma from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { TRPCError } from '@trpc/server';
import { privateProcedure, publicProcedure, router } from './trpc';
import { z } from 'zod';
import { INFINITE_QUERY_LIMIT } from '@/config/infinite-query';

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
  }),
  getFileUploadStatus: privateProcedure.input(z.object({
    fileId: z.string()
  })).query(async({ input, ctx }) => {
    const file = await prisma.file.findFirst({
      where: {
        id: input.fileId,
        userId: ctx.userId
      }
    })

    if (!file) {
      return {status: "PENDING" as const}
    }

    return {status: file.uploadStatus}
  }),
  getFileMessages: privateProcedure.input(z.object({
    limit: z.number().min(1).max(100).nullish(),
    cursor: z.string().nullish(),
    fileId: z.string()
  })).query(async({ctx,input}) => {
    const { userId } = ctx;
    const { fileId, cursor } = input;
    const limit = input.limit ?? INFINITE_QUERY_LIMIT;

    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        userId
      }
    })

    if (!file) throw new TRPCError({ code: "NOT_FOUND" });

    const messages = await prisma.message.findMany({
      take: limit + 1,
      orderBy: {
        createdAt: "desc"
      },
      cursor: cursor ? { id: cursor } : undefined,
      select: {
        id: true,
        isUserMessage: true,
        createdAt: true,
        text: true
      },
      where: {
        fileId
      }
    })

    let nextCursor: typeof cursor | undefined;

    if (messages.length > limit) {
      const nextItem = messages.pop();
      nextCursor = nextItem?.id
    }

    return {
      messages,
      nextCursor
    }
  })
}) 

export type AppRouter = typeof appRouter;