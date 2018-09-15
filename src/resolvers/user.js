import jwt from 'jsonwebtoken';
import { UserInputError, AuthenticationError } from 'apollo-server';

const createToken = async (user, secret, expiresIn) => {
  const {
    id,
    email,
    username
  } = user;
  return await jwt.sign({
    id,
    email,
    username
  }, secret, {
    expiresIn,
  });
};



export default {
  Query: {
    users: async (parent, args, {
        models
      }) => {
        return await models.User.findAll();
      },
      user: async (parent, {
          id
        }, {
          models
        }) => {
          return await models.User.findById(id)
        },
        me: async (parent, args, {
            me,
            models
          }) => {
            return await models.User.findById(me.id)
          },

  },

  Mutation: {
    signUp: async (
      parent, {
        username,
        email,
        password
      }, {
        models,
        secret
      },
    ) => {
      const user = await models.User.create({
        username,
        email,
        password,
      });

      return {
        token: createToken(user, secret, '30m')
      };
    },

    signIn: async (parent, {login, password}, {models, secret})=>{
      const user =await models.User.findByLogin(login)
      if(!user) {
        throw new UserInputError('NO user found with this login credientiels')

      }

      const isValid = await user.validatePassword(password)

      if(!isValid){
        throw new AuthenticationError('Invalid password')
      }

      return {token: createToken(user, secret, '30m')};
    }
  },


  User: {
    messages: async (user, args, {
      models
    }) => {

      return await models.Message.findAll({
        where: {
          userId: user.id
        }
      })
    },
  }
}