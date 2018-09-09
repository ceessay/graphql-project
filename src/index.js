import express from "express";
import {
  ApolloServer,
  gql
} from "apollo-server-express";
// import cors from "cors";
import users from './data';

const app = express();
// app.use(cors);

const schema = gql `
type Query {
    me: User
    user(id: ID!) : User
    users: [User!]
  }

  # type Mutation {
  #   addBook(title: String, author: String): Book
  # }

  type User {
    id: ID!
    first_name: String!
    middle_name: String!
    last_name: String!
    username: String!
    friends: [String!]
    age: Int!
  }
`;


// const me = users[1]

const resolvers = {
  Query: {
    me: (parent, args, {me}) => {
      return me;
    },
    user: (parent, {
      id
    }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    }
  },
  // User: {
  //   username: user => {
  //     // console.log('user', user)
  //     return `${user.first_name} ${user.middle_name} ${user.last_name} `;
  //   }
  // }
};


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    me: users[1]
  }
});

server.applyMiddleware({
  app,
  path: "/graphy"
});

app.listen({
  port: 8000
}, () => {
  console.log("Appolo Server on http://localhost:8000/graphy");
});
