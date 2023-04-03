"use strict";
const { Model } = require("sequelize");
const { SubscriptionPeriodValuesList } = require("../../enum");
module.exports = (sequelize, DataTypes) => {
  class SubscriptionTypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SubscriptionTypes.init(
    {
      Type: DataTypes.ENUM(SubscriptionPeriodValuesList),
    },
    {
      sequelize,
      modelName: "SubscriptionTypes",
    }
  );
  return SubscriptionTypes;
};
