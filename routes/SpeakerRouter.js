const express = require("express");
const { getContacts, addContact } = require("../controllers/Speakers");

const router = express.Router();

router.route("/").get(getContacts).post(addContact);

module.exports = router;
