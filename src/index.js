import express from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

import { ApolloServer, AuthenticationError } from "apollo-server-express";
// import cors from "cors";
import uuidv4 from "uuid/v4";
import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";

const app = express();
// app.use(cors);

// getme

const getMe = async req => {
  const token = req.heqder["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("your session expired. Sign in again");
    }
  }
};

// run server
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);
    return {
      models,
      me,
      secret: process.env.SECRET
    };
  }
});

server.applyMiddleware({
  app,
  path: "/graphy"
});

const eraseDatabaseOnSync = true;
sequelize
  .sync({
    force: eraseDatabaseOnSync
  })
  .then(async () => {
    if (eraseDatabaseOnSync) {
      createUsersWithMessages();
    }
    app.listen(
      {
        port: 8000
      },
      () => {
        console.log("Appolo Server on http://localhost:8000/graphy");
      }
    );
  });

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "sadiyaa",
      email: "sadiyaa@gmail.com",
      password: "passer",
      messages: [
        {
          text: "Published the Road to learn React"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "ddavids",
      email: "ddavids@gmail.com",
      password: "passer",
      messages: [
        {
          text: "Happy to release ..."
        },
        {
          text: "Published a complete ..."
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};
