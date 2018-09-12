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
    first_name: {
      type: DataType.STRING
    },
    middle_name: {
      type: DataType.STRING
    },
    last_name: {
      type: DataType.STRING
    },
    last_name: {
      type: DataType.INTEGER
    },
  })

  User.associate = models => {
    User.hasMany(models.Message)
  }

  user.findByLogin = async (login) => {
    let user = await User.findOne({
      where: {
        username: login
      }
    })

    return user;
  }


  return User
}
export default user
