'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserEducation = sequelize.define('UserEducation', {
    title:{
      allowNull: {
        args: false,
        msg: 'Please enter the title of your education'
      },
      type: DataTypes.STRING
    },
    program: {
      allowNull: {
        args: false,
        msg: 'Please enter the program name'
      },
      type: DataTypes.STRING
    },
    start_date: {
      allowNull: {
        args: false,
        msg: 'Please enter the start date'
      },
      type: DataTypes.STRING
    },
    end_date: {
      allowNull: true,
      type: DataTypes.DATE
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {model: 'User',
        key: 'id',
        as: 'userId'
      }
    }
  }, {});
  UserEducation.associate = function(models) {
    // associations can be defined here
    UserEducation.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserEducation;
};