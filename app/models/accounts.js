// Example model


module.exports = function (sequelize, DataTypes) {

  var Account = sequelize.define('Account', {
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Account;

};

