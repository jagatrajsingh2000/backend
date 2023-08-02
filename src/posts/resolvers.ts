// resolvers.ts

import { PrismaClient, Post, Prisma } from '@prisma/client';
import { Context } from '../context';

const prisma = new PrismaClient();

interface CreatePostInput {
    title: string
    description: string
    tag: [string]
    image: string
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
  
        // Get the authenticated user ID from the context (if you have an authentication mechanism)
        // Replace 'userId' with the actual field used to store the authenticated user ID in the 'User' model
        const userId = context.userId;
        const user = await prisma.user.findUnique({ where: { id:userId } });
        // Create the post using Prisma client
        const post = await context.prisma.post.create({
          data: {
            title,
            description,
            tag,
            image,
            userId:user.id, // Set the user ID to link the post to the user
          },
        });
  
        return post;
      },
    },
    updatePost: async (_: any, { id, input }: { id: number; input: Prisma.PostUpdateInput }, context: Context) => {
      return await prisma.post.update({ where: { id }, data: input });
    },
    deletePost: async (_: any, { id }: { id: number }, context: Context) => {
      return await prisma.post.delete({ where: { id } });
    },
  }
