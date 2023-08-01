import { AuthenticationError } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { generateAccessToken, getUserId } from '../auth';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../auth';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

interface SignupInput {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    userName: string;
  }
  
  interface LoginInput {
    email: string;
    password: string;
  }
export const resolvers = {
    queries: {
    me: async (parent: any, args: any, context: any) => {
      const userId = getUserId(context);
      const user = await prisma.user.findUnique({ where: { id: userId } });
      return user ?? null;
    },
  },
  mutations: {
    signup: async (parent: any, { input }: { input: SignupInput }, context: any) => {
      const { email, password, firstName, lastName, userName } = input;

      // Check if user with the same email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new AuthenticationError('Email is already registered');
      }

      // Generate a salt and hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create the new user in the database
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          userName,
        },
      });

      const accessToken = generateAccessToken(newUser);
      const refreshToken = jwt.sign({ userId: newUser.id }, APP_SECRET, {
        expiresIn: '7d',
      });

      return {
        user: newUser,
        accessToken,
        refreshToken,
      };
    },
    login: async (parent: any, { input }: { input: LoginInput }, context: any) => {
      const { email, password } = input;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      // Implement password validation here
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new AuthenticationError('Invalid email or password');
      }

      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign({ userId: user.id }, APP_SECRET, {
        expiresIn: '7d',
      });

      return {
        user,
        accessToken,
        refreshToken,
      };
    },
    refreshTokens: async (parent: any, { refreshToken }: { refreshToken: string }, context: any) => {
      try {
        const decoded = jwt.verify(refreshToken, APP_SECRET) as { userId: number };
        const userId = decoded.userId;
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          throw new AuthenticationError('User not found');
        }

        const accessToken = generateAccessToken(user);

        return {
          user,
          accessToken,
          refreshToken,
        };
      } catch (error) {
        throw new AuthenticationError('Invalid refresh token');
      }
    },
  },
};
