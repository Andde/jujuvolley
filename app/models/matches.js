// Example model


module.exports = function (sequelize, DataTypes) {

  var Match = sequelize.define('Match', {
    date: DataTypes.DATE,
    opponent: DataTypes.STRING	
  }, {
    classMethods: {
      associate: function (models) {
        Match.belongsTo(models.Team);
		Match.belongsTo(models.User);
        Match.hasMany(models.MatchStat);
      } 
    }
  });

  return Match;

};

