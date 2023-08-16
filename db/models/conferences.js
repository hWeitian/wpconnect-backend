const { DataTypes } = require("sequelize");

const initConference = (sequelize) =>
  sequelize.define(
    "Conference",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      venue: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      wordpressUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      programId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      programUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

module.exports = initConference;
