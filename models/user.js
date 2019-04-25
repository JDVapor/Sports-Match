module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    rewards: DataTypes.INTEGER
  });
  return Users;
};
