const HabitLog = require("../models/HabitLog");
const Habit = require("../models/Habit");
const User = require("../models/User");
const { calculateStreak } = require("../utils/streakCalculator");

// @desc    Create or update habit log
// @route   POST /api/logs
// @access  Private
const createOrUpdateLog = async (req, res, next) => {
  try {
    const { habitId, date, progress, notes } = req.body;

    // Verify habit belongs to user
    const habit = await Habit.findOne({ _id: habitId, userId: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    // Calculate if completed
    const completed = progress >= habit.target;

    // Find or create log
    let log = await HabitLog.findOne({
      userId: req.user._id,
      habitId,
      date,
    });

    if (log) {
      // Update existing log
      log.progress = progress;
      log.completed = completed;
      if (notes) log.notes = notes;
      await log.save();
    } else {
      // Create new log
      log = await HabitLog.create({
        userId: req.user._id,
        habitId,
        date,
        progress,
        completed,
        notes,
      });
    }

    // Recalculate streak
    const streak = await calculateStreak(req.user._id);
    await User.findByIdAndUpdate(req.user._id, {
      currentStreak: streak,
      longestStreak: Math.max(streak, req.user.longestStreak),
      lastCompletionDate: new Date(),
    });

    res.status(201).json({
      success: true,
      data: log,
      streak,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get today's logs
// @route   GET /api/logs/today
// @access  Private
const getTodayLogs = async (req, res, next) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const logs = await HabitLog.find({
      userId: req.user._id,
      date: today,
    }).populate("habitId");

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logs for specific date
// @route   GET /api/logs/date/:date
// @access  Private
const getLogsByDate = async (req, res, next) => {
  try {
    const { date } = req.params;

    const logs = await HabitLog.find({
      userId: req.user._id,
      date,
    }).populate("habitId");

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all logs for a specific habit
// @route   GET /api/logs/habit/:habitId
// @access  Private
const getLogsByHabit = async (req, res, next) => {
  try {
    const { habitId } = req.params;

    // Verify habit belongs to user
    const habit = await Habit.findOne({ _id: habitId, userId: req.user._id });
    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const logs = await HabitLog.find({
      userId: req.user._id,
      habitId,
    })
      .sort({ date: -1 })
      .limit(30); // Last 30 days

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logs for date range
// @route   GET /api/logs/range?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
// @access  Private
const getLogsByDateRange = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const logs = await HabitLog.find({
      userId: req.user._id,
      date: { $gte: startDate, $lte: endDate },
    })
      .populate("habitId")
      .sort({ date: -1 });

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete log
// @route   DELETE /api/logs/:id
// @access  Private
const deleteLog = async (req, res, next) => {
  try {
    const log = await HabitLog.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    await log.deleteOne();

    // Recalculate streak
    const streak = await calculateStreak(req.user._id);
    await User.findByIdAndUpdate(req.user._id, {
      currentStreak: streak,
    });

    res.json({
      success: true,
      message: "Log deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrUpdateLog,
  getTodayLogs,
  getLogsByDate,
  getLogsByHabit,
  getLogsByDateRange,
  deleteLog,
};
