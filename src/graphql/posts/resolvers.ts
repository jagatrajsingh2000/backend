// resolvers.ts

import { PrismaClient, Post, Prisma } from "@prisma/client";
import { Context } from "../../context";

const prisma = new PrismaClient();

interface CreatePostInput {
  title: string;
  description: string;
  tag: [string];
  image: string;
}

export const resolvers = {
  queries: {
    getPost: async (_: any, { id }: { id: number }, context: Context) => {
      return await prisma.post.findUnique({ where: { id } });
    },
    getAllPosts: async () => {
      return await prisma.post.findMany();
    },
  },
  mutations: {
    createPost: async (_: any, payload: CreatePostInput, context: Context) => {
      // Extract the input values from the 'input' argument
      const { title, description, tag, image } = payload;

      // Get the authenticated user ID from the context
      const userId = context.userId;
      console.log("user:",userId);
      if (!userId) {
        throw new Error("Not authenticated");
      }

      // Check if the authenticated user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("Authenticated user not found");
      }

      // Create the post using Prisma client
      const post = await context.prisma.post.create({
        data: {
          title,
          description,
          tag,
          image,
          userId: user.id, // Set the user ID to link the post to the user
        },
      });

      return post;
    },
  },
  updatePost: async (
    _: any,
    { id, input }: { id: number; input: Prisma.PostUpdateInput },
    context: Context
  ) => {
    return await prisma.post.update({ where: { id }, data: input });
  },
  deletePost: async (_: any, { id }: { id: number }, context: Context) => {
    return await prisma.post.delete({ where: { id } });
  },
};
