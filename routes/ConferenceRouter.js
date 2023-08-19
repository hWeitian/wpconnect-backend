const express = require("express");
const { getConferences, addConference } = require("../controllers/Conferences");

const router = express.Router();

router.route("/").get(getConferences).post(addConference);

module.exports = router;
