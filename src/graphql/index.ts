// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from "@apollo/server";
// import prismaClient from "../lib/db";
import { User } from "./user";
import {Post} from "./posts";
import { Like } from "./like"

async function createAppoloGraphqlServer(){
    const gqlServer = new ApolloServer({

      typeDefs:`
      ${User.typeDefs},
      ${Post.typeDefs}
      ${Like.typeDefs}`
      ,
        resolvers: {
          Query: {
            ...User.resolvers.queries,
            ...Post.resolvers.queries,
          },
          Mutation: {
            ...User.resolvers.mutations,
            ...Post.resolvers.mutations,
            ...Like.resolvers.mutations
          },
        },
      });
    await gqlServer.start()
    return gqlServer;

}
export default createAppoloGraphqlServer;