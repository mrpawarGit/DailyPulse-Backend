const Habit = require("../models/Habit");

// @desc    Get all habits for logged-in user
// @route   GET /api/habits
// @access  Private
const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({
      userId: req.user._id,
      isArchived: false,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: habits.length,
      data: habits,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single habit
// @route   GET /api/habits/:id
// @access  Private
const getHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    res.json({
      success: true,
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new habit
// @route   POST /api/habits
// @access  Private
const createHabit = async (req, res, next) => {
  try {
    const { name, icon, category, type, target, color } = req.body;

    const habit = await Habit.create({
      userId: req.user._id,
      name,
      icon,
      category,
      type,
      target,
      color,
    });

    res.status(201).json({
      success: true,
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update habit
// @route   PUT /api/habits/:id
// @access  Private
const updateHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const { name, icon, category, type, target, color } = req.body;

    if (name) habit.name = name;
    if (icon) habit.icon = icon;
    if (category) habit.category = category;
    if (type) habit.type = type;
    if (target) habit.target = target;
    if (color) habit.color = color;

    await habit.save();

    res.json({
      success: true,
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete habit
// @route   DELETE /api/habits/:id
// @access  Private
const deleteHabit = async (req, res, next) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    await habit.deleteOne();

    res.json({
      success: true,
      message: "Habit deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Archive/Unarchive habit
// @route   PATCH /api/habits/:id/archive
// @access  Private
const toggleArchive = async (req, res, next) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.isArchived = !habit.isArchived;
    await habit.save();

    res.json({
      success: true,
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHabits,
  getHabit,
  createHabit,
  updateHabit,
  deleteHabit,
  toggleArchive,
};
