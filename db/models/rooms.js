const { DataTypes } = require("sequelize");

const initRoom = (sequelize) =>
  sequelize.define(
    "Room",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      conferenceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "conferences",
          key: "id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

module.exports = initRoom;
