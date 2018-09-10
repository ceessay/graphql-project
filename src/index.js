import express from "express";
import {
  ApolloServer,
  gql
} from "apollo-server-express";
// import cors from "cors";
import uuidv4 from 'uuid/v4';
import {
  users,
  messages
} from './data';

const app = express();
// app.use(cors);

const schema = gql `
type Query {
    me: User
    user(id: ID!) : User
    users: [User!]

    messages:[Message!]!
    message(id: ID!):Message!
  }

   type Mutation {
    createMessage(text: String!): Message
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


// const me = users[1]

const resolvers = {
  Query: {
    me: (parent, args, {
      me
    }) => {
      return me;
    },
    user: (parent, {
      id
    }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    },
    messages: () => {
      return Object.values(messages);
    },
    message: (parent, {
      id
    }) => {
      return messages[id];
    },


  },

  Mutation: {
    createMessage: (parent, {
      text
    }, {
      me
    }) => {

      const id = uuidv4()
      const message = {
        id,
        text,
        userID: me.id
      };
      messages[id] = messages
      users[me.id].messageIds.push(id);

      return message;
    }
  },


  User: {
    messages: (user) => {
      return Object.values(messages)
        .filter(message => message.userId === user.id)
    }
  },
  Message: {
    user: (message, args) => {
      // console.log('message', message)
      return users[message.userId]
    }
  }
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
