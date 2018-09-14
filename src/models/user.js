const user = (sequelize, DataType) => {
  const User = sequelize.define('user', {
    // id: ID!
    // first_name: String!
    // middle_name: String!
    // last_name: String!
    // username: String!
    // friends: [String!]
    // age: Int!
    // messages: [Message!]

    username: {
      type: DataType.STRING
    },
    email: {
      type: DataType.STRING
    }
  })

  User.associate = models => {
    User.hasMany(models.Message)
  }

  User.findByLogin = async login => {
    let user = await User.findOne({
      where: {
        username: login
      },
    });

    if (!user) {
      user = await User.findOne({
        where: {
          email: login
        },
      });
    }

    return user;
  };

  return User
}
export default user