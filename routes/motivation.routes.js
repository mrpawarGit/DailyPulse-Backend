const express = require("express");
const { getQuote, getTips } = require("../controllers/motivationController");

const router = express.Router();

// Public routes (no authentication required)
router.get("/quote", getQuote);
router.get("/tips", getTips);

module.exports = router;
