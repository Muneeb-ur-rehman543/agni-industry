const express = require("express");

const router = express.Router();

const {
  saveContact,
  getContacts,
} = require("../controllers/contactController");

// Save contact message
router.post("/", saveContact);

// Get all contact messages
router.get("/", getContacts);

module.exports = router;