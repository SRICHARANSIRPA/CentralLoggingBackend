"use strict";
const { Model } = require("sequelize");
const { LogLevelValues, LogLevel } = require("../../enum");
module.exports = (sequelize, DataTypes) => {
  class Logs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Logs.belongsTo(models.Events, {
        foreignKey: "eventId",
      });
      Logs.belongsTo(models.LogDataSource, {
        foreignKey: "dataSourceId",
      });
      Logs.belongsTo(models.Client, {
        foreignKey: "clientId",
      });
    }
  }
  Logs.init(
    {
      Traceid: DataTypes.STRING,
      LogIdentifier: DataTypes.STRING,
      eventId: DataTypes.INTEGER,
      dataSourceId: DataTypes.INTEGER,
      level: {
        type: DataTypes.ENUM(LogLevelValues),
        allowNull: false,
        defaultValue: LogLevel.INFO,
      },
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Logs",
    }
  );
  return Logs;
};
