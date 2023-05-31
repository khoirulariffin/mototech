"use strict";

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
    const motorcycles = require("../dummy/motorcycles.json");
    motorcycles.forEach((motorcycle) => {
      motorcycle.createdAt = new Date();
      motorcycle.updatedAt = new Date();
    });
    await queryInterface.bulkInsert("Motorcycles", motorcycles);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Motorcycles", null, {});
  },
};
