const HabitLog = require("../models/HabitLog");
const Habit = require("../models/Habit");
const Mood = require("../models/Mood");

// @desc    Get dashboard overview
// @route   GET /api/analytics/overview
// @access  Private
const getOverview = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    // Get total habits
    const totalHabits = await Habit.countDocuments({
      userId,
      isArchived: false,
    });

    // Get today's completion rate
    const todayLogs = await HabitLog.find({ userId, date: today });
    const completedToday = todayLogs.filter((log) => log.completed).length;
    const completionRate =
      totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

    // Get total completions (all time)
    const totalCompletions = await HabitLog.countDocuments({
      userId,
      completed: true,
    });

    res.json({
      success: true,
      data: {
        totalHabits,
        completedToday,
        completionRate,
        totalCompletions,
        currentStreak: req.user.currentStreak,
        longestStreak: req.user.longestStreak,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get weekly trends
// @route   GET /api/analytics/trends
// @access  Private
const getTrends = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const daysBack = parseInt(req.query.days) || 7;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);
    const startDateStr = startDate.toISOString().split("T")[0];

    const habits = await Habit.find({ userId, isArchived: false });
    const logs = await HabitLog.find({
      userId,
      date: { $gte: startDateStr },
    });

    // Group by date
    const trends = [];
    for (let i = 0; i < daysBack; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const dayLogs = logs.filter((log) => log.date === dateStr);
      const completed = dayLogs.filter((log) => log.completed).length;
      const total = habits.length;
      const completion = total > 0 ? Math.round((completed / total) * 100) : 0;

      trends.unshift({
        date: dateStr,
        completion,
        completed,
        total,
      });
    }

    res.json({
      success: true,
      data: trends,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get category breakdown
// @route   GET /api/analytics/category-breakdown
// @access  Private
const getCategoryBreakdown = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const habits = await Habit.find({ userId, isArchived: false });

    // Group by category
    const breakdown = {};
    habits.forEach((habit) => {
      if (!breakdown[habit.category]) {
        breakdown[habit.category] = {
          name: habit.category,
          count: 0,
        };
      }
      breakdown[habit.category].count++;
    });

    res.json({
      success: true,
      data: Object.values(breakdown),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get mood statistics
// @route   GET /api/analytics/mood-stats
// @access  Private
const getMoodStats = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const daysBack = parseInt(req.query.days) || 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);
    const startDateStr = startDate.toISOString().split("T")[0];

    const moods = await Mood.find({
      userId,
      date: { $gte: startDateStr },
    });

    // Count mood occurrences
    const moodCounts = {};
    moods.forEach((mood) => {
      if (!moodCounts[mood.mood]) {
        moodCounts[mood.mood] = 0;
      }
      moodCounts[mood.mood]++;
    });

    const moodStats = Object.keys(moodCounts).map((mood) => ({
      mood,
      count: moodCounts[mood],
    }));

    res.json({
      success: true,
      data: moodStats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get best performing habits
// @route   GET /api/analytics/best-habits
// @access  Private
const getBestHabits = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const daysBack = parseInt(req.query.days) || 30;

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);
    const startDateStr = startDate.toISOString().split("T")[0];

    const habits = await Habit.find({ userId, isArchived: false });
    const logs = await HabitLog.find({
      userId,
      date: { $gte: startDateStr },
    });

    // Calculate completion rate for each habit
    const habitStats = habits.map((habit) => {
      const habitLogs = logs.filter(
        (log) => log.habitId.toString() === habit._id.toString()
      );
      const completedCount = habitLogs.filter((log) => log.completed).length;
      const completionRate =
        habitLogs.length > 0
          ? Math.round((completedCount / daysBack) * 100)
          : 0;

      return {
        habit: {
          id: habit._id,
          name: habit.name,
          icon: habit.icon,
          category: habit.category,
        },
        completionRate,
        completedDays: completedCount,
      };
    });

    // Sort by completion rate
    habitStats.sort((a, b) => b.completionRate - a.completionRate);

    res.json({
      success: true,
      data: habitStats.slice(0, 5), // Top 5 habits
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOverview,
  getTrends,
  getCategoryBreakdown,
  getMoodStats,
  getBestHabits,
};
