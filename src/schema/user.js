import {
  gql
} from "apollo-server-express";


export default gql `
extend type Query {
    me: User
    user(id: ID!) : User
    users: [User!]

  }
  type User {
    id: ID!
    first_name: String!
    middle_name: String!
    last_name: String!
    username: String!
    friends: [String!]
    age: Int!
    messages: [Message!]
  }
`;