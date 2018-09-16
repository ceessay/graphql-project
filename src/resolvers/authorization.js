import { ForbiddenError } from "appolo-server";
import { skip } from "graphql-resolvers";

export const isAuthenticated = (parents, args, { me }) => {
  me ? skip : new ForbiddenError("Not authenticated as user");
};

export const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findById(id, { raw: true });
  if (message.userId !== me.id) {
    throw new ForbiddenError("Not authorized");
  }

  return skip;
};
