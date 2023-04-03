"use strict";
/** @type {import('sequelize-cli').Migration} */
const { LogLevelValues, LogLevel } = require("../../enum");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      Traceid: {
        type: Sequelize.STRING,
      },
      LogIdentifier: {
        type: Sequelize.STRING,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Events",
          key: "id",
        },
      },
      dataSourceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "LogDataSources",
          key: "id",
        },
      },
      level: {
        type: Sequelize.ENUM(LogLevelValues),
        allowNull: false,
        defaultValue: LogLevel.INFO,
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
    await queryInterface.dropTable("Logs");
  },
};
