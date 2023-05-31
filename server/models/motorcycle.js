"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Motorcycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Motorcycle.belongsTo(models.Maker, { foreignKey: "IdMaker" });
      Motorcycle.hasMany(models.PriceList, { foreignKey: "IdMotorcycle" });
    }
  }
  Motorcycle.init(
    {
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Model is required",
          },
          notEmpty: {
            msg: "Model is required",
          },
        },
      },
      IdMaker: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Model is required",
          },
          notEmpty: {
            msg: "Model is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Motorcycle",
    }
  );
  return Motorcycle;
};
