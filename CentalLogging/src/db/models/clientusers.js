"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClientUsers extends Model {
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
  ClientUsers.init(
    {
      name: DataTypes.STRING,
      Email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ClientUsers",
    }
  );
  return ClientUsers;
};
