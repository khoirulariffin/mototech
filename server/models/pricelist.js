"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PriceList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PriceList.belongsTo(models.Service, { foreignKey: "IdService" });
      PriceList.belongsTo(models.Motorcycle, { foreignKey: "IdMotorcycle" });
    }
  }
  PriceList.init(
    {
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required",
          },
          notEmpty: {
            msg: "Price is required",
          },
        },
      },
      IdService: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Id Service is required",
          },
          notEmpty: {
            msg: "Id Service is required",
          },
        },
      },
      IdMotorcycle: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Id Motorcycle is required",
          },
          notEmpty: {
            msg: "Id Motorcycle is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "PriceList",
    }
  );
  return PriceList;
};
