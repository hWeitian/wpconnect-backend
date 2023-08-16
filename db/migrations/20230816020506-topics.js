"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("topics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "sessions",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      conference_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "conferences",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      sequence: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("topics");
  },
};
