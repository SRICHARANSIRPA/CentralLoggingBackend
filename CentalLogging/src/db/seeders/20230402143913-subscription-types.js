"use strict";
const { SubscriptionPeriodValues } = require("../../enum");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "SubscriptionTypes",
      [
        {
          Type: SubscriptionPeriodValues.Quarterly,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Type: SubscriptionPeriodValues.Monthly,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          Type: SubscriptionPeriodValues.Yearly,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("SubscriptionTypes", null, {});
  },
};
