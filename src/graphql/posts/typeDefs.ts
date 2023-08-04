export const typeDefs = `
# typeDefs.ts

type Post {
  id: Int!
  user: User!
  title: String!
  description: String!
  tag: [String!]!
  image: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  views: Int!
}
type UpdatePost {
  title: String!
}

input CreatePostInput {
  title: String!
  description: String!
  tag: [String!]!
  image: String!
}

input UpdatePostInput {
  title: String
  description: String
  tag: [String!]
  image: String
}

type Query {
  getPost(id: Int!): Post
  getAllPosts: [Post!]!
}

type Mutation {
  createPost(  title: String!, description: String!, tag: [String!]!, image: String!): Post!
  updatePost(id: Int!, title: String!, description: String, tag: [String], image: String): UpdatePost!
  deletePost(id: Int!): Post!
}

`;
