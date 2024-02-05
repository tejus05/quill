import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import prisma from '@/db'

const f = createUploadthing();

export const ourFileRouter = {
  
  pdfUploader: f({ pdf: { maxFileSize: "4MB" } })
  .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession();
      // This code runs on your server before upload
      const user = await getUser();

      
      if (!user || !user.id) throw new UploadThingError("Unauthorized");

      
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createdFile = await prisma.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: "PROCESSING"
        }
      })
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;