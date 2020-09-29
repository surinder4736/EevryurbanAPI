'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserAbout = sequelize.define('userabout', {
    
    university: {
      allowNull: {
        args: false,
        msg: 'Please enter the link '
      },
      type: DataTypes.STRING
    },
    program: {
      allowNull: {
        args: false,
        msg: 'Please enter the program '
      },
      type: DataTypes.STRING
    },
    status: {
        allowNull: {
          args: false,
          msg: 'Please enter the link '
        },
        type: DataTypes.STRING
      },
      month: {
        allowNull: {
          args: false,
          msg: 'Please enter the link '
        },
        type: DataTypes.STRING
      },  
      year: {
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
  UserAbout.associate = function(models) {
    // associations can be defined here
    UserAbout.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };
  return UserAbout;
};