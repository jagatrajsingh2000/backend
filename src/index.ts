import { ApolloServer } from 'apollo-server';
import { User } from './user';
import { Post } from './posts';
import { PrismaClient } from '@prisma/client';
import { getUserId } from './auth';
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs:`
  ${User.typeDefs},
  ${Post.typeDefs}`,
  resolvers: {
    Query: {
      ...User.resolvers.queries,
      ...Post.resolvers.queries
    },
    Mutation: {
      ...User.resolvers.mutations,
      ...Post.resolvers.mutations
    },
  },
  context: ({ req }) => ({
    ...req,
    prisma,
    userId: req.headers.accessToken && getUserId(req),
  }),
});

const port = 4000;
server.listen(port).then(() => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
