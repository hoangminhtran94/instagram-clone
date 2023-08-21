import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma;

export const modifiedPrisma = prisma.$extends({
  model: {
    post: {
      async checkYourPostAndLike(postId: string, userId: string | null) {
        let yourPost = false;
        let youLikeThis = false;
        if (!userId) {
          return {
            yourPost,
            youLikeThis,
          };
        }
        try {
          const post = await prisma.post.findFirst({
            where: { id: postId, ownerId: userId },
          });
          const like = await prisma.like.findFirst({
            where: { ownerId: userId, postId: postId },
          });
          yourPost = !!post;
          youLikeThis = !!like;
          return {
            yourPost,
            youLikeThis,
          };
        } catch (error) {
          return {
            yourPost,
            youLikeThis,
          };
        }
      },
    },
  },
});
