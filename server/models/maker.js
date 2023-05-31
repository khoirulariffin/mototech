"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Maker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Maker.hasMany(models.Motorcycle, { foreignKey: "IdMaker" });
    }
  }
  Maker.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required",
          },
          notEmpty: {
            msg: "Name is required",
          },
        },
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Origin is required",
          },
          notEmpty: {
            msg: "Origin is required",
          },
        },
      },
      officialAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Official Address is required",
          },
          notEmpty: {
            msg: "Official Address is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Maker",
    }
  );
  return Maker;
};
