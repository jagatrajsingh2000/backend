import { PrismaClient, Like, Post, User } from "@prisma/client";
const prisma = new PrismaClient();
export const resolvers = {
  mutations: {
    followUser: async (
      _: any,
      { userId }: { userId: number },
      context: any
    ) => {
      const currentUser = await prisma.user.findUnique({
        where: { id: context.userId },
      });

      if (!currentUser) {
        throw new Error("Authenticated user not found");
      }

      // Check if the user being followed exists
      const userToFollow = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userToFollow) {
        throw new Error("User to follow not found");
      }

      // Check if the user is already following the user to follow
      const existingFollowing = await prisma.following.findFirst({
        where: {
          followerId: currentUser.id,
          followingId: userToFollow.id,
        },
      });

      if (existingFollowing) {
        // User is already following the user, return the user as is
        return currentUser;
      }

      // Create a new following relationship in the database
      await prisma.following.create({
        data: {
          followerId: currentUser.id,
          followingId: userToFollow.id,
        },
      });

      return await prisma.user.findUnique({
        where: { id: currentUser.id },
        include: {
          following: true,
        },
      });
    },
    unfollowUser: async (
      _: any,
      { userId }: { userId: number },
      context: any
    ) => {
      const currentUser = await prisma.user.findUnique({
        where: { id: context.userId },
      });

      if (!currentUser) {
        throw new Error("Authenticated user not found");
      }

      // Check if the user to unfollow exists
      const userToUnfollow = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!userToUnfollow) {
        throw new Error("User to unfollow not found");
      }

      // Check if the user is already following the user to unfollow
      const existingFollowing = await prisma.following.findFirst({
        where: {
          followerId: currentUser.id,
          followingId: userToUnfollow.id,
        },
      });

      if (!existingFollowing) {
        // User is not following the user, return false
        return false;
      }

      // Delete the following relationship from the database
      await prisma.following.delete({
        where: {
          id: existingFollowing.id,
        },
      });
      return true;
    },
  },
};
