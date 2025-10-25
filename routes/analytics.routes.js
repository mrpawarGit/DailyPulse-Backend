const express = require("express");
const {
  getOverview,
  getTrends,
  getCategoryBreakdown,
  getMoodStats,
  getBestHabits,
} = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// All routes are protected
router.use(protect);

router.get("/overview", getOverview);
router.get("/trends", getTrends);
router.get("/category-breakdown", getCategoryBreakdown);
router.get("/mood-stats", getMoodStats);
router.get("/best-habits", getBestHabits);

module.exports = router;
