'use strict';
module.exports = (sequelize, DataTypes) => {
  var Books = sequelize.define('Books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      validate: {
        isNumeric: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true,
      },
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    genre: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    first_published: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    }
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};
