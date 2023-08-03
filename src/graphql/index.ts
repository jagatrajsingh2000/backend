// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from "@apollo/server";
// import prismaClient from "../lib/db";
import { User } from "./user";
import {Post} from "./posts";

async function createAppoloGraphqlServer(){
    const gqlServer = new ApolloServer({

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
      });
    await gqlServer.start()
    return gqlServer;

}
export default createAppoloGraphqlServer;