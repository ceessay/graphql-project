import express from "express";
import 'dotenv/config'

import {
  ApolloServer,
} from "apollo-server-express";
// import cors from "cors";
import uuidv4 from 'uuid/v4';
import schema from "./schema"
import resolvers from './resolvers'
import models, {
  sequelize
} from './models';

const app = express();
// app.use(cors);


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin('sadiyaa'),
    secret: process.env.secret
  })
});

server.applyMiddleware({
  app,
  path: "/graphy"
});


const eraseDatabaseOnSync = true;
sequelize.sync({
  force: eraseDatabaseOnSync
}).then(async () => {

  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }

  app.listen({
    port: 8000
  }, () => {
    console.log("Appolo Server on http://localhost:8000/graphy");
  });
})



const createUsersWithMessages = async () => {
  await models.User.create({
    username: 'sadiyaa',
    email: 'sadiyaa@gmail.com',
    password: 'passer',
    messages: [{
      text: 'Published the Road to learn React',
    }, ],
  }, {
    include: [models.Message],
  }, );

  await models.User.create({
    username: 'ddavids',
    email: 'ddavids@gmail.com',
    password: 'passer',
    messages: [{
        text: 'Happy to release ...',
      },
      {
        text: 'Published a complete ...',
      },
    ],
  }, {
    include: [models.Message],
  }, );
};
