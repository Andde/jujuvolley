// Example model


module.exports = function (sequelize, DataTypes) {

  var Team = sequelize.define('Team', {
    name: DataTypes.STRING,
    age: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Team.hasMany(models.Player);
      }
    }
  });

  return Team;

};

