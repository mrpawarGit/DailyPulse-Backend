const HabitLog = require("../models/HabitLog");
const Habit = require("../models/Habit");

const calculateStreak = async (userId) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let currentDate = new Date(today);

    // Get all active habits for the user
    const habits = await Habit.find({ userId, isArchived: false });

    if (habits.length === 0) {
      return 0;
    }

    // Check each day backwards
    while (true) {
      const dateStr = currentDate.toISOString().split("T")[0];

      // Get logs for this date
      const logs = await HabitLog.find({ userId, date: dateStr });

      // Check if all habits were completed on this day
      const allCompleted = habits.every((habit) => {
        const log = logs.find(
          (l) => l.habitId.toString() === habit._id.toString()
        );
        return log && log.progress >= habit.target;
      });

      if (allCompleted) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  } catch (error) {
    console.error("Error calculating streak:", error);
    return 0;
  }
};

module.exports = { calculateStreak };
