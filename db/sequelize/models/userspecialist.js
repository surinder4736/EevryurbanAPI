'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSpecialties = sequelize.define('userspecialtie', {
    name:{
      allowNull: {
        args: false,
        msg: 'Please select type of link'
      },
      type: DataTypes.STRING
    },
    userid: {
        type: DataTypes.INTEGER,
        references: {model: 'User',
        key: 'id',
        as: 'userid'
      }
    }
  }, {});
  UserSpecialties.associate = function(models) {
    // associations can be defined here
    UserSpecialties.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return UserSpecialties;
};