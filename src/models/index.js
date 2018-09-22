import Sequelize from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize(null, null, null, {
  dialect: "sqlite",
  storage: process.env.TEST_DATABASE
    ? "../../db.test.sqlite3"
    : "../../db.sqlite3"
});

const models = {
  User: sequelize.import("./user.js"),
  Message: sequelize.import("./message.js")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;

// const users = {

//   1: {
//     id: '1',
//     first_name: "Alimatou",
//     middle_name: "Sadiya",
//     last_name: "Diaho",
//     username: "sadiyaa",
//     friends: ["mohamed", "sana", "thiaba"],
//     age: 24,
//     messageIds: [1]
//   },
//   2: {
//     id: '2',
//     first_name: "Assane",
//     middle_name: "Sana",
//     last_name: "Badji",
//     username: "sana16",
//     friends: ["mohamed", "sana", "thiaba"],
//     age: 24,
//     messageIds: [2]

//   },
//   3: {
//     id: '3',
//     first_name: "Mame",
//     middle_name: "Thiaba",
//     last_name: "Diop",
//     username: "mimistic",
//     friends: ["mohamed", "sana", "sadiyaa"],
//     age: 24,
//     messageIds: []

//   },
// };

// const messages = {
//   1: {
//     id: '1',
//     text: 'Hello World',
//     userId: '1',
//   },
//   2: {
//     id: '2',
//     text: 'Bye World',
//     userId: '2',
//   },
// };
