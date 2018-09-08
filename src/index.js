import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
// import cors from "cors";

const app = express();
// app.use(cors);

const schema = gql`
  type Query {
    me: User
  }

  type User {
    first_name: String!
    middle_name: String!
    last_name: String!
    username: String!
    friends: [String!]
    age: Int!
  }
`;

const resolvers = {
  Query: {
    me: () => {
      return {
        first_name: "Alimatou",
        last_name: "Sadiya",
        last_name: "Diaho",
        username: "sadiyaa",
        friends: ["mohamed", "sana", "thiaba"],
        age: 24
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: "/graphy" });

app.listen({ port: 8000 }, () => {
  console.log("Appolo Server on http://localhost:8000/graphy");
});
