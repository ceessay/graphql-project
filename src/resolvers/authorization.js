import { ForbiddenError } from "appolo-server";
import { skip } from "graphql-resolvers";

export const isAuthenticated = (parents, args, { me }) => {
  me ? skip : new ForbiddenError("Not authenticated as user");
};
