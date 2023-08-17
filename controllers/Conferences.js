const db = require("../db/models");
const { Conference } = db;
const { Op } = require("sequelize");

const getConferences = async (req, res) => {
  try {
    const conferences = await Conference.findAll({
      order: [["startDate", "DESC"]],
    });
    return res.status(200).json(conferences);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getConferences,
};
