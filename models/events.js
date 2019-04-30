module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    location: DataTypes.STRING,
    timeOfEvent: DataTypes.TIME,
    eventDate: DataTypes.DATE,
    maxPlayers: DataTypes.INTEGER,
    currentPlayers: DataTypes.INTEGER
  });
  return Event;
};
