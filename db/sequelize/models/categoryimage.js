'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCategoryImage = sequelize.define('categoryimage', {
    folloid:{
      allowNull: {
        args: false,
        msg: 'Please select type of link'
      },
      type: DataTypes.INTEGER
    },
    imageurl: {
      allowNull: {
        args: false,
        msg: 'Please enter the link '
      },
      type: DataTypes.STRING
    },
    caption: {
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
  UserCategoryImage.associate = function(models) {
    // associations can be defined here
    UserCategoryImage.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return UserCategoryImage;
};