'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
        'UserLanguages',
        'userId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'users', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'UserLanguages',
      'userId'
    );
  }
};
