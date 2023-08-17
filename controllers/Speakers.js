const db = require("../db/models");
const { Speaker } = db;
const { Op } = require("sequelize");

const getContacts = async (req, res) => {
  console.log("here");
  try {
    const contacts = await Speaker.findAll();
    return res.status(200).json(contacts);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getContacts,
};
