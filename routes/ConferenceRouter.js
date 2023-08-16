const express = require("express");
const { getConferences } = require("../controllers/Conferences");

const router = express.Router();

router.route("/").get(getConferences);

module.exports = router;
