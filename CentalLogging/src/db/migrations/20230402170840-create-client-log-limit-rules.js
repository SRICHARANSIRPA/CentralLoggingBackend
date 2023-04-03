"use strict";
/** @type {import('sequelize-cli').Migration} */
const { SubscriptionPeriodValuesList } = require("../../enum");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ClientLogLimitRules", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      period: {
        type: Sequelize.ENUM(SubscriptionPeriodValuesList),
      },
      Limit: {
        type: Sequelize.INTEGER,
      },
      clientId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Clients",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ClientLogLimitRules");
  },
};
