'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserPortfollo = sequelize.define('visualportfollocategory', {
    folloid:{
      allowNull: {
        args: false,
        msg: 'Please select type of category'
      },
      type: DataTypes.INTEGER
    },
    other: {
      allowNull: {
        args: false,
        msg: 'Please enter the custom category '
      },
      type: DataTypes.STRING
    },
    caption:{
      allowNull: {
        args: false,
        msg: 'Please enter the caption '
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
  UserPortfollo.associate = function(models) {
    // associations can be defined here
    UserPortfollo.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return UserPortfollo;
};