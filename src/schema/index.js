import {
  gql
} from "apollo-server-express";

const schema = gql `
type Query {
    me: User
    user(id: ID!) : User
    users: [User!]

    messages:[Message!]!
    message(id: ID!):Message!
  }

   type Mutation {
    createMessage(text: String!): Message!
    updateMessage(id: ID!, text: String!): Message!
    deleteMessage (id: ID!): Boolean
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
  type Message {
    id: ID!
    text: String!
    user: User!
  }

`;

export default schema;