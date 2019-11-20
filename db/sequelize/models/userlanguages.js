'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLanguages = sequelize.define('UserLanguages', {
    name: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter the name of your language'
      }
    },
    proficiency: {type: DataTypes.STRING},
    userId: {
        type: DataTypes.INTEGER,
        references: {model: 'User',
        key: 'id',
        as: 'userId'
      }
    } 
  }, {});
  UserLanguages.associate = function(models) {
    // associations can be defined here
    UserLanguages.belongsTo(models.User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
  });
  };
  return UserLanguages;
};