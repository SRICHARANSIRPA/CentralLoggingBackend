"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ClientUsers.belongsTo(models.Client, { foreignKey: "clientId" });
    }
  }
  ClientPermissions.init(
    {
      accessKey: DataTypes.STRING,
      isBlocked: DataTypes.BOOLEAN,
      clientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ClientPermissions",
    }
  );
  return ClientPermissions;
};
