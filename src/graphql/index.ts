// import { ApolloServer } from 'apollo-server';
import { ApolloServer } from "@apollo/server";
// import prismaClient from "../lib/db";
import { User } from "./user";
import {Post} from "./posts";
import { Like } from "./like";
import { Follow } from "./follow";
import { Collection } from "./collection";

async function createAppoloGraphqlServer(){
    const gqlServer = new ApolloServer({

      typeDefs:`
      ${User.typeDefs}
      ${Post.typeDefs}
      ${Like.typeDefs}
      ${Follow.typeDefs}
      ${Collection.typeDefs}`
      ,
        resolvers: {
          Query: {
            ...User.resolvers.queries,
            ...Post.resolvers.queries,
            ...Collection.resolvers.queries
          },
          Mutation: {
            ...User.resolvers.mutations,
            ...Post.resolvers.mutations,
            ...Like.resolvers.mutations,
            ...Follow.resolvers.mutations,
            ...Collection.resolvers.mutations
          },
        },
      });
    await gqlServer.start()
    return gqlServer;

}
export default createAppoloGraphqlServer;