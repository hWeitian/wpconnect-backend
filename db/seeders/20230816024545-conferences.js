"use strict";
// make your seeder file
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("conferences", [
      {
        start_date: "2021-07-22",
        end_date: "2021-07-24",
        name: "Annual Meeting 2021",
        country: "Singapore",
        venue: "Singapore Exhibition Center",
        wordpress_url: "https://hweitian.com",
      },
      {
        start_date: "2022-07-24",
        end_date: "2022-07-26",
        name: "Annual Meeting 2022",
        country: "South Korea",
        venue: "Coex Exhibition Center",
        wordpress_url: "https://hweitian.com",
      },
      {
        start_date: "2023-07-29",
        end_date: "2023-07-31",
        name: "Annual Meeting 2023",
        country: "Japan",
        venue: "Japan Convention Center",
        wordpress_url: "https://hweitian.com",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("conferences", null, {});
  },
};
