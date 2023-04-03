'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientMonthlyLogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.ClientMonthlyLogs.belongsTo(models.Client, { foreignKey: "clientId" });
    }
  }
  ClientMonthlyLogs.init({
    month: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    clientId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ClientMonthlyLogs',
  });
  return ClientMonthlyLogs;
};