const express = require("express");
const { body } = require("express-validator");
const {
  createOrUpdateLog,
  getTodayLogs,
  getLogsByDate,
  getLogsByHabit,
  getLogsByDateRange,
  deleteLog,
} = require("../controllers/logController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequest");

const router = express.Router();

// Validation rules
const logValidation = [
  body("habitId").notEmpty().withMessage("Habit ID is required"),
  body("date")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM-DD format"),
  body("progress")
    .isInt({ min: 0 })
    .withMessage("Progress must be a non-negative number"),
];

// All routes are protected
router.use(protect);

router.post("/", logValidation, validate, createOrUpdateLog);
router.get("/today", getTodayLogs);
router.get("/date/:date", getLogsByDate);
router.get("/habit/:habitId", getLogsByHabit);
router.get("/range", getLogsByDateRange);
router.delete("/:id", deleteLog);

module.exports = router;
