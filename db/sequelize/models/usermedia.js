'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMedia = sequelize.define('usersociallink', {
    socialid:{
      allowNull: {
        args: false,
        msg: 'Please select type of link'
      },
      type: DataTypes.INTEGER
    },
    link: {
      allowNull: {
        args: false,
        msg: 'Please enter the link '
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
  UserMedia.associate = function(models) {
    // associations can be defined here
    UserMedia.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return UserMedia;
};