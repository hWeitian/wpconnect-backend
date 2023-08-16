const db = require("../db/models");
const { Session } = db;
const { Op } = require("sequelize");

const getSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll();
    return res.status(200).json(sessions);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getSessions,
};
