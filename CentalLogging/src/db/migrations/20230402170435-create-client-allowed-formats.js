"use strict";
/** @type {import('sequelize-cli').Migration} */
const { LogFormatValuesList } = require("../../enum");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ClientAllowedFormats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      format: {
        type: Sequelize.ENUM(LogFormatValuesList),
      },
      isActive: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("ClientAllowedFormats");
  },
};
