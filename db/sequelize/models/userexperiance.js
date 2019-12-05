'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserExperiance = sequelize.define('UserExperiance', {
    title:{
      allowNull: {
        args: false,
        msg: 'Please enter the title of your experiance'
      },
      type: DataTypes.STRING
    },
    location: {
      allowNull: {
        args: false,
        msg: 'Please enter the location of your experiance'
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
    description: {
      allowNull: true,
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
  UserExperiance.associate = function(models) {
    // associations can be defined here
    UserExperiance.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserExperiance;
};