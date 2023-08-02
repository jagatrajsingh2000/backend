
export const typeDefs = `
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
    signup( firstName: String!, lastName: String!, email: String!, password: String!, userName: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    refreshTokens(refreshToken: String!): AuthPayload
  }
`;
