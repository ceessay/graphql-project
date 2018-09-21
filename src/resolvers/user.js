import jwt from "jsonwebtoken";
import { UserInputError, AuthenticationError } from "apollo-server";
import { combineResolvers } from "graphql-resolvers";
import { isAdmin } from "./authorization";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, role } = user;
  return await jwt.sign(
    {
      id,
      email,
      username,
      role
    },
    secret,
    {
      expiresIn
    }
  );
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.findAll();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.findById(id);
    },
    me: async (parent, args, { me, models }) => {
      return await models.User.findById(me.id);
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { username, email, password },
      { models, secret }
    ) => {
      const user = await models.User.create({
        username,
        email,
        password
      });

      return {
        token: await createToken(user, secret, "1440m")
      };
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);
      if (!user) {
        throw new UserInputError("NO user found with this login credientiels");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password");
      }

      return await { token: createToken(user, secret, "1440m") };
    },

    deleteUser: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        return await models.User.destroy({
          where: {
            id
          }
        });
      }
    )
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      });
    }
  }
};
