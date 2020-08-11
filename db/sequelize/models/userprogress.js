'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProgress = sequelize.define('userprogresse', {
    progressid:{
      allowNull: {
        args: false,
        msg: 'Please select type of link'
      },
      type: DataTypes.INTEGER
    },
    establishment:{
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
  UserProgress.associate = function(models) {
    // associations can be defined here
    UserProgress.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return UserProgress;
};