module.exports = function(sequelize, {STRING, TEXT, DATE, TIME, INTEGER}) {
  var Event = sequelize.define("Event", {
    category: STRING,
    description: TEXT,
    location: STRING,
    timeOfEvent: TIME,
    eventDate: DATE,
    maxPlayers: INTEGER,
    currentPlayers: INTEGER,
    username: STRING
  });
  Event.associate = (models) => {
    Event.belongsToMany(models.User, {
      through: 'UserToEvent',
      // as: 'user',
      foreignKey: 'eventId'
    });
  };
  return Event;
};
