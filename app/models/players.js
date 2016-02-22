// Example model


module.exports = function (sequelize, DataTypes) {

  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    number: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        Player.belongsTo(models.Team)
	  }
    }
  });

  return Player;

};

