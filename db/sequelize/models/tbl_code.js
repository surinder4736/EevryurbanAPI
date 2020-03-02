'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_code = sequelize.define('tbl_codes', {
    code: DataTypes.STRING,
    label: DataTypes.STRING,
    type: DataTypes.STRING
  }, {});
  tbl_code.associate = function(models) {
    // associations can be defined here
  };
  return tbl_code;
};