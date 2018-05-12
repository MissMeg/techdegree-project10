'use strict';
module.exports = (sequelize, DataTypes) => {
  var loans = sequelize.define('loans', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        isNumeric: true,
      },
    },
    book_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    patron_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    loaned_on: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      },
    },
    return_by: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      },
    },
    returned_on: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      },
    },
  }, {});
  loans.associate = function(models) {
    // associations can be defined here
  };
  return loans;
};
