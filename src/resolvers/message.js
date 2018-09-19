import Sequelize from "sequelize";
import uuidv4 from "uuid/v4";
import { combineResolvers } from "graphql-resolvers";

import { isAuthenticated, isMessageOwner } from "./authorization";

export default {
  Query: {
    messages: async (parent, { cursor, limit = 100 }, { models }) => {
      cursor ? (cursor = new Date(parseInt(cursor)).toISOString()) : null;
      const cursorOptions = cursor
        ? {
            where: {
              createdAt: {
                [Sequelize.Op.lt]: cursor
              }
            }
          }
        : {};

      return await models.Message.findAll({
        order: [["createdAt", "DESC"]],
        limit,
        ...cursorOptions
      });
    },
    message: async (parent, { id }, { models }) => {
      return await models.Message.findById(id);
    }
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { me, models }) => {
        return await models.Message.create({
          text,
          userId: me.id
        });
      }
    ),

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => {
        return await models.Message.destroy({
          where: {
            id
          }
        });
      }
    )
  },

  Message: {
    user: async (message, args, { models }) => {
      return await models.User.findById(message.userId);
    }
  }
};
