'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',
      'unique_userid',
     Sequelize.STRING
    )

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'users',
      'unique_userid'
    );
  }
};
