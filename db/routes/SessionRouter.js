const express = require("express");
const { getSessions } = require("../controllers/Sessions");

const router = express.Router();

router.route("/").get(getSessions);

module.exports = router;
