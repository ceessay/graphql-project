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

//   describe("deleteUser(id: String!): Boolean!", () => {
//     it("returns an error because only admins can delete a user", async () => {
//       const {
//         data: {
//           data: {
//             signIn: { token }
//           }
//         }
//       } = await userApi.signIn({
//         login: "sadiyaa",
//         password: "passer"
//       });

//       const {
//         data: { errors }
//       } = await userApi.deleteUser({ id: "2" }, token);

//       console.log("messages", errors);

//       expect(errors[0].message).to.eql("Not authorized as admin.");
//     });
//   });
// });
