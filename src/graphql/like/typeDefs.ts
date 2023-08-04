export const typeDefs = `
# typeDefs.ts
type Like {
  id: Int!
  post: Post!
  user: User!
}
type Mutation {
  likePost(postId: Int!): Like!
  unlikePost(postId: Int!): Boolean!
}
`;
