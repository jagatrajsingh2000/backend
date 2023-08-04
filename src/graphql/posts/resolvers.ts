// resolvers.ts

import { PrismaClient, Post, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
interface CreatePostInput {
  title: string;
  description?: string;
  tag?: [string];
  image?: string;
}
interface UpdatePostInput {
  id: number;
  title: string;
  description?: string;
  tag?: [string];
  image?: string;
}

export const resolvers = {
  queries: {
    getPost: async (_: any, { id }: { id: number }, context: any) => {
      return await prisma.post.findUnique({ where: { id, userId:context.userId } });
    },
    getAllPosts: async (_:any,__:any,context:any) => {
      const user = await prisma.user.findUnique({ where: { id: context.userId } });
      // console.log(user)
      if (!user) {
        throw new Error("Authenticated user not found");
      }
      return await prisma.post.findMany();
    },
  },
  mutations: {
    createPost: async (_: any, payload: CreatePostInput, context: any) => {
      // Extract the input values from the 'input' argument
      const { title, description, tag, image } = payload;

      // Get the authenticated user ID from the context
      const userId = context.userId;
      if (!userId) {
        throw new Error("Not authenticated");
      }

      // Check if the authenticated user exists
      const user = await prisma.user.findUnique({ where: { id: userId } });
      // console.log(user)
      if (!user) {
        throw new Error("Authenticated user not found");
      }

      // Create the post using Prisma client
      const post = await prisma.post.create({
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
    updatePost: async (_:any, payload: UpdatePostInput, context:any) => {
    
      const { id , title, description, tag, image } = payload;
      console.log("upadtePost:",title)
      const updatedPost = await prisma.post.update({
        where: {
          id: id,
          userId: context.userId,
        },
        data: {
          title: title,
          description: description,
          tag: tag,
          image: image,
          id: id,
        }
      });
      return updatedPost;
    },
      
  deletePost: async (_: any, { id }: { id: number }, context: any) => {
    const post = await prisma.post.findUnique({
      where: {
        id:id,
        userId: context.userId,
      }
     })
     if(post){
       return await prisma.post.delete({ where: { id } });
     }
     throw new Error ("No post found");
  },
  },

};
