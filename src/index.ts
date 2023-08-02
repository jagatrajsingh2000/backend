import { ApolloServer } from 'apollo-server';
import { User } from './user';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs:`
  ${User.typeDefs}`,
  resolvers: {
    Query: {
      ...User.resolvers.queries,
    },
    Mutation: {
      ...User.resolvers.mutations,
    },
  },
  context: ({ req }) => ({
    ...req,
    prisma,
  }),
});

const port = 4000;
server.listen(port).then(() => {
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});
