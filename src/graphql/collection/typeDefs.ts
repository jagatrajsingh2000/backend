export const typeDefs = `
# typeDefs.ts
type Collection {
  id: Int!
  name: String!
  user: User!
  timeStamp: DateTime!
  posts: [Post!]!
}
type Query {
  getCollection(id: Int): Boolean!
}
type Mutation {
  createCollection(postId: Int!): Boolean! 
  deleteCollection(collectionId: Int!): Boolean!
  
}
`;
