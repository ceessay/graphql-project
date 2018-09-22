import { expect } from "chai";
import * as userApi from "./api";

// describe("users", () => {
//   it("users is user", () => {
//     expect(user).to.eql("user");
//   });
// });

describe("users", () => {
  describe("user(id: String!): User", () => {
    it("returns a user when user can be found", async () => {
      const expectedResult = {
        data: {
          user: {
            id: "1",
            username: "sadiyaa",
            email: "sadiyaa@gmail.com",
            role: "ADMIN"
          }
        }
      };

      const result = await userApi.user({ id: "1" });

      expect(result.data).to.eql(expectedResult);
    });

    it("returns null when user cannot be found", async () => {
      const expectedResult = {
        data: {
          user: null
        }
      };
      const result = await userApi.user({ id: "0" });

      expect(result.data).to.eql(expectedResult);
    });
  });
});
