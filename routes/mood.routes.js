const express = require("express");
const { body } = require("express-validator");
const Mood = require("../models/Mood");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequest");

const router = express.Router();

// Validation rules
const moodValidation = [
  body("date")
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .withMessage("Date must be in YYYY-MM-DD format"),
  body("mood").isIn(["😊", "😐", "😔", "😡", "😴"]).withMessage("Invalid mood"),
];

// All routes are protected
router.use(protect);

// @desc    Create or update mood for a day
// @route   POST /api/moods
// @access  Private
router.post("/", moodValidation, validate, async (req, res, next) => {
  try {
    const { date, mood, notes } = req.body;

    let moodEntry = await Mood.findOne({
      userId: req.user._id,
      date,
    });

    if (moodEntry) {
      moodEntry.mood = mood;
      if (notes) moodEntry.notes = notes;
      await moodEntry.save();
    } else {
      moodEntry = await Mood.create({
        userId: req.user._id,
        date,
        mood,
        notes,
      });
    }

    res.status(201).json({
      success: true,
      data: moodEntry,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get today's mood
// @route   GET /api/moods/today
// @access  Private
router.get("/today", async (req, res, next) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const mood = await Mood.findOne({
      userId: req.user._id,
      date: today,
    });

    res.json({
      success: true,
      data: mood,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get moods for date range
// @route   GET /api/moods/range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// @access  Private
router.get("/range", async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const moods = await Mood.find({
      userId: req.user._id,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });

    res.json({
      success: true,
      data: moods,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
