"use strict";
// make your seeder file
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("rooms", [
      { name: "Singapore Room 1", conference_id: 1 },
      { name: "Singapore Room 2", conference_id: 1 },
      { name: "Singapore Room 3", conference_id: 1 },
      { name: "South Korea Room 1", conference_id: 2 },
      { name: "South Korea Room 2", conference_id: 2 },
      { name: "South Korea Room 3", conference_id: 2 },
      { name: "Japan Room 1", conference_id: 3 },
      { name: "Japan Room 2", conference_id: 3 },
      { name: "Japan Room 3", conference_id: 3 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("rooms", null, {});
  },
};
