"use strict";
const { LogFormatValuesList } = require("../../enum");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LogDataSource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LogDataSource.init(
    {
      Type: DataTypes.ENUM(LogFormatValuesList),
      Value: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "LogDataSource",
    }
  );
  return LogDataSource;
};
