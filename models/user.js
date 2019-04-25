module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: DataTypes.DATE,
    bio: DataTypes.TEXT,
    rewards: DataTypes.INTEGER
  });
  return Users;
};
