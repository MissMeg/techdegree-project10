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
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    genre: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
      },
    },
    first_published: DataTypes.INTEGER,
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};
