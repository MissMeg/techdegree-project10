'use strict';
module.exports = (sequelize, DataTypes) => {
  var patrons = sequelize.define('patrons', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        isNumeric: true,
      },
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    address: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    library_id: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
      },
    },
    zip_code: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
  }, {});
  patrons.associate = function(models) {
    // associations can be defined here
  };
  return patrons;
};
