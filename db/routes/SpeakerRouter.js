const express = require("express");
const { getContacts } = require("../controllers/Speakers");

const router = express.Router();

router.route("/").get(getContacts);

module.exports = router;
