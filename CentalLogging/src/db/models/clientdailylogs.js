"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientDailyLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ClientDailyLogs.belongsTo(models.Client, { foreignKey: "clientId" });
    }
  }
  ClientDailyLogs.init(
    {
      date: DataTypes.DATE,
      count: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClientDailyLogs",
    }
  );
  return ClientDailyLogs;
};
