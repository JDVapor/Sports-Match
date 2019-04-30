module.exports = function(sequelize, DataTypes) {
  var UserToEvent = sequelize.define('UserToEvent', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Event',
        key: 'id'
      }
    }
  });
  return UserToEvent;
};
