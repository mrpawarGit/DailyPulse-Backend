// routes/habit.routes.js
const express = require("express");
const { body } = require("express-validator");
const {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleArchive,
} = require("../controllers/habitController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequest");

const router = express.Router();

// Validation rules
const habitValidation = [
  body("name").trim().notEmpty().withMessage("Habit name is required"),
  body("type").isIn(["boolean", "countable"]).withMessage("Invalid habit type"),
  body("target")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Target must be at least 1"),
];

// All routes are protected
router.use(protect);

router.route("/").get(getHabits).post(habitValidation, validate, createHabit);

router.route("/:id").get(getHabit).put(updateHabit).delete(deleteHabit); // DELETE route is here

router.patch("/:id/archive", toggleArchive);

module.exports = router;
