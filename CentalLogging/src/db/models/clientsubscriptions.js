"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientSubscriptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ClientSubscriptions.belongsTo(models.SubscriptionTypes, {
        foreignKey: "subscriptionId",
      });
      models.ClientSubscriptions.belongsTo(models.Client, {
        foreignKey: "clientId",
      });
    }
  }
  ClientSubscriptions.init(
    {
      isActive: DataTypes.BOOLEAN,
      StartDate: DataTypes.DATE,
      EndDate: DataTypes.DATE,
      subscriptionId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClientSubscriptions",
    }
  );
  return ClientSubscriptions;
};
