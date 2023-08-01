import { gql } from 'apollo-server';

export const typeDefs = gql`
  scalar DateTime

  type User {
    id: Int!
    firstName: String
    lastName: String
    email: String!
    userName: String!
    password: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type AuthPayload {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  input SignupInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
    userName: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload
    login(input: LoginInput!): AuthPayload
    refreshTokens(refreshToken: String!): AuthPayload
  }
`;
