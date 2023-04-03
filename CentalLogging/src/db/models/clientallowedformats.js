"use strict";

const { LogFormatValuesList } = require("../../enum");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientAllowedFormats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClientAllowedFormats.belongsTo(models.Client, {
        foreignKey: "clientId",
      });
    }
  }
  ClientAllowedFormats.init(
    {
      format: DataTypes.ENUM(LogFormatValuesList),
      isActive: DataTypes.BOOLEAN,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClientAllowedFormats",
    }
  );
  return ClientAllowedFormats;
};
