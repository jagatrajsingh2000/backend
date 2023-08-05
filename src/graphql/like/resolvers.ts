import { PrismaClient, Like, Post, User } from '@prisma/client';
const prisma = new PrismaClient();
export const resolvers = {
  mutations: {
    likePost: async (_: any, { postId }: { postId: number }, context: any) => {
      // Get the authenticated user ID from the context
      const userId = context.userId;
      if (!userId) {
        throw new Error('Not authenticated');
      }

      // Check if the post exists
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        throw new Error('Post not found');
      }

      // Check if the user has already liked the post
      const existingLike = await prisma.like.findUnique({
        where: { postId_userId: { postId, userId } },
      });

      if (existingLike) {
        throw new Error('You have already liked this post');
      }

      // Create the like using Prisma client
      const like = await prisma.like.create({
        data: {
          post: { connect: { id: postId } },
          user: { connect: { id: userId } },
        },
      });

      return like;
    },

    unlikePost: async (_: any, { postId }: { postId: number }, context: any) => {
      // Get the authenticated user ID from the context
      const userId = context.userId;
      if (!userId) {
        throw new Error('Not authenticated');
      }

      // Check if the post exists
      const post = await prisma.post.findUnique({ where: { id: postId } });
      if (!post) {
        throw new Error('Post not found');
      }

      // Check if the user has liked the post
      const existingLike = await prisma.like.findUnique({
        where: { postId_userId: { postId, userId } },
      });

      if (!existingLike) {
        throw new Error('You have not liked this post');
      }

      // Delete the like using Prisma client
      await prisma.like.delete({ where: { id: existingLike.id } });

      return true;
    },
  },
};
