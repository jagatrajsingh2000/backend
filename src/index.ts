import { ApolloServer } from 'apollo-server';
import { User } from './user';
import { PrismaClient } from '@prisma/client'; // Import the typeDefs from typeDefs.ts
const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs:`
  ${User.typeDefs}`, // Use the imported typeDefs here
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
