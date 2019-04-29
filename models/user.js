const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = process.env;

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
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
  User.beforeCreate(user => bcrypt.hash(user.password, parseInt(SALT_ROUNDS))
     .then(hash => user.password = hash)
     .catch(err => console.log(err)));
 User.prototype.validPassword = function(password) {
   return bcrypt.compareSync(password, this.password);
 };
  return User;
};
