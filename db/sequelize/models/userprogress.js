'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProgress = sequelize.define('userprogresse', {
    
    position:{
      allowNull: {
        args: false,
        msg: 'Please enter position'
      },
      type: DataTypes.STRING
    },
    establishment:{
        allowNull: {
          args: false,
          msg: 'Please enter establishment'
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