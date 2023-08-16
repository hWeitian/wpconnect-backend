const { DataTypes } = require("sequelize");

const initConferenceSpeaker = (sequelize) =>
  sequelize.define(
    "ConferenceSpeaker",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
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
      speakerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "speakers",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      speakerPostId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      speakerPostLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
    }
  );

module.exports = initConferenceSpeaker;
