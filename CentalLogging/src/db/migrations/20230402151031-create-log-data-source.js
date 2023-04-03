'use strict';
/** @type {import('sequelize-cli').Migration} */
const {LogFormatValuesList} = require("../../enum")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LogDataSources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Type: {
        type: Sequelize.ENUM(LogFormatValuesList)
      },
      Value: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('LogDataSources');
  }
};