'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    firstName: {
      type:DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type:DataTypes.STRING,
      allowNull: true
    },
    about: {
      type:DataTypes.STRING,
      allowNull: true
    },
    photo: {
      type:DataTypes.STRING,
      allowNull: true
    },
    country: {
      type:DataTypes.STRING,
      allowNull: false
    },
    address: {
      type:DataTypes.STRING,
      allowNull: true
    },
    portfolio: {
      type:DataTypes.STRING,
      allowNull: true
    },
    isCompleted: DataTypes.BOOLEAN,
    userId: {
        type: DataTypes.INTEGER,
        references: {model: 'User',
        key: 'id',
        as: 'userId'
      }
    }
  }, {});
  UserProfile.associate = function(models) {
    // associations can be defined here
    UserProfile.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return UserProfile;
};