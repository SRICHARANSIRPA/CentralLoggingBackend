"use strict";
const { SubscriptionPeriodValuesList } = require("../../enum");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientLogLimitRules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ClientAllowedFormats.belongsTo(models.Client, {
        foreignKey: "clientId",
      });
    }
  }
  ClientLogLimitRules.init(
    {
      period: DataTypes.ENUM(SubscriptionPeriodValuesList),
      Limit: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClientLogLimitRules",
    }
  );
  return ClientLogLimitRules;
};
