import { PrismaClient, Like, Post, User } from "@prisma/client";
const prisma = new PrismaClient();
export const resolvers = {
  queries: {
    getCollection: async (_:any,__:any,context:any) => {
      try {
        const data = await prisma.collection.findMany({
          where:{
            user: {
              id: context.userId
            }
          },
          include:{
            post: true
          }
        })
        console.log(data)
        return true
      } catch (error) {
        throw new Error("Couldn't find collection")
      }
      
    }
  },
  mutations: {
    createCollection: async (_: any, { postId }: { postId: number }, context: any) => {
      const userId = context.userId;
      if (!userId) {
        throw new Error('Not authenticated');
      }
      const userAuth = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userAuth) {
        throw new Error("Not authenticated");
      }
      const alreadyExist = await prisma.collection.findFirst({
        where: {
          postId: postId,
          userId: userId,
          
        }
      })
      if (alreadyExist) {
        throw new Error('Collection already saved');
      }
      // Create the collection using Prisma client
      const collection = await prisma.collection.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });

      return true;
    },
    deleteCollection: async (_: any, { collectionId }: { collectionId: number }, context: any) => {
      const userId = context.userId;
      if (!userId) {
        throw new Error('Not authenticated');
      }
      const userAuth = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userAuth) {
        throw new Error("Not authenticated");
      }
      try {
        const demo = await prisma.collection.delete({
          where: {
                    id: collectionId,     
                  }
        })
      } catch (error) {
        return false;
      }
      return true
    }
  },
};
