"use strict";
/** @type {import('sequelize-cli').Migration} */
const { SubscriptionPeriodValuesList } = require("../../enum");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("SubscriptionTypes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Type: {
        type: Sequelize.ENUM(SubscriptionPeriodValuesList),
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
    await queryInterface.dropTable("SubscriptionTypes");
  },
};
