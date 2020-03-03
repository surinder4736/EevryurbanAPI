'use strict';
module.exports = (sequelize, DataTypes) => {
  const tbl_contactus = sequelize.define('tbl_contactus', {
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    enquiry_type: DataTypes.STRING,
    message: DataTypes.STRING
  }, {});
  tbl_contactus.associate = function(models) {
    // associations can be defined here
  };
  return tbl_contactus;
};