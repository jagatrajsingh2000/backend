export const typeDefs = `
# typeDefs.ts
type Mutation {
  followUser(userId: Int!): User!
  unfollowUser(userId: Int!): Boolean!
}
`;
