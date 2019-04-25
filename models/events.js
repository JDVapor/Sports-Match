module.exports = function(sequelize, DataTypes) {
  var Events = sequelize.define("Events", {
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    timeOfEvent: DataTypes.TIME,
    maxPlayers: DataTypes.INTEGER,
    currentPlayers: DataTypes.INTEGER
  });
  return Events;
};
