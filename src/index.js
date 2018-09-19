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
  const token = req.headers["x-token"];
  console.log("request header", req.headers);

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

const date = new Date();
const getCreateDate = () => date.setSeconds(date.getSeconds() + 1);

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "sadiyaa",
      email: "sadiyaa@gmail.com",
      password: "passer",
      role: "ADMIN",
      messages: [
        {
          text: "Published the Road to learn React",
          createdAt: getCreateDate()
        }
      ]
    },
    {
      include: [models.Message]
    }
  );

  await models.User.create(
    {
      username: "sana",
      email: "sana@gmail.com",
      password: "passer",
      role: "BASIC",
      messages: [
        {
          text: "Bonjour ...",
          createdAt: getCreateDate()
        },
        {
          text: "comment vas-tu ...",
          createdAt: getCreateDate()
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
      role: "BASIC",
      messages: [
        {
          text: "Happy to release ...",
          createdAt: getCreateDate()
        },
        {
          text: "Published a complete ...",
          createdAt: getCreateDate()
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
  await models.User.create(
    {
      username: "ddavids2",
      email: "ddavids2@gmail.com",
      password: "passer",
      role: "BASIC",
      messages: [
        {
          text: "Happy to release ...",
          createdAt: getCreateDate()
        },
        {
          text: "Published a complete ...",
          createdAt: getCreateDate()
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
  await models.User.create(
    {
      username: "ddavids3",
      email: "ddavids3@gmail.com",
      password: "passer",
      role: "BASIC",
      messages: [
        {
          text: "kdfjlsdjkflj ...",
          createdAt: getCreateDate()
        },
        {
          text: "dfkjsldfjl ...",
          createdAt: getCreateDate()
        },
        {
          text: "oppopipipi ...",
          createdAt: getCreateDate()
        },
        {
          text: "Happy to release3 ...",
          createdAt: getCreateDate()
        },
        {
          text: "Published a complete3 ...",
          createdAt: getCreateDate()
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};
