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

const addContact = async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    title,
    email,
    organisation,
    biography,
    photoUrl,
    isAdmin,
  } = req.body;
  try {
    const speaker = await Speaker.create({
      firstName,
      lastName,
      country,
      title,
      email,
      organisation,
      biography,
      photoUrl,
      isAdmin,
    });

    if (isAdmin) {
      const response = await addUserToAuth(firstName, email);
    }

    return res.status(200).json(speaker);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getContacts,
  addContact,
};
