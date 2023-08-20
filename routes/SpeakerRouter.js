const express = require("express");
const {
  getContacts,
  addContact,
  deleteContact,
  getContact,
  updateContact,
} = require("../controllers/Speakers");

const router = express.Router();

router.route("/").get(getContacts).post(addContact);

router
  .route("/:contactId")
  .delete(deleteContact)
  .get(getContact)
  .put(updateContact);

module.exports = router;
