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
  body: String
}

type Query {
  getPost(id: Int!): Post
  getAllPosts: [Post!]!
}

type Mutation {
  createPost(  title: String!, description: String!, tag: [String!]!, image: String!, body: String!,): Post!
  updatePost(id: Int!, title: String!, description: String!, tag: [String!]!, image: String!, body: String!,): Post!
  deletePost(id: Int!): Post!
}

`;
