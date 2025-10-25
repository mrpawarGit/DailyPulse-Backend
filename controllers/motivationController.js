const quotes = [
  "The secret of getting ahead is getting started.",
  "Well done is better than well said.",
  "The journey of a thousand miles begins with a single step.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Believe you can and you're halfway there.",
  "Success is the sum of small efforts repeated day in and day out.",
  "The only way to do great work is to love what you do.",
  "Don't watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "You don't have to be great to start, but you have to start to be great.",
];

// @desc    Get random motivational quote
// @route   GET /api/motivation/quote
// @access  Public
const getQuote = async (req, res, next) => {
  try {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    res.json({
      success: true,
      data: { quote },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get habit building tips
// @route   GET /api/motivation/tips
// @access  Public
const getTips = async (req, res, next) => {
  try {
    const tips = [
      {
        title: "Start Small",
        description:
          "Begin with habits that take less than 2 minutes to complete.",
      },
      {
        title: "Be Consistent",
        description:
          "Do your habit at the same time every day to build automaticity.",
      },
      {
        title: "Track Your Progress",
        description: "Visual tracking increases motivation and accountability.",
      },
      {
        title: "Stack Your Habits",
        description:
          "Link new habits to existing ones for better success rates.",
      },
      {
        title: "Celebrate Wins",
        description:
          "Acknowledge every streak and milestone, no matter how small.",
      },
    ];

    res.json({
      success: true,
      data: tips,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuote,
  getTips,
};
