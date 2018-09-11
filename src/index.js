import express from "express";
import {
  ApolloServer,
} from "apollo-server-express";
// import cors from "cors";
import uuidv4 from 'uuid/v4';
import models from './models';
import schema from "./schema"
import resolvers from './resolvers'

const app = express();
// app.use(cors);

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
    me: models.users[1]
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