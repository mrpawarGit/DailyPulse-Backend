const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Please provide a habit name"],
      trim: true,
    },
    icon: {
      type: String,
      default: "✅",
    },
    category: {
      type: String,
      enum: [
        "Health",
        "Productivity",
        "Mindfulness",
        "Fitness",
        "Learning",
        "Other",
      ],
      default: "Other",
    },
    type: {
      type: String,
      enum: ["boolean", "countable"],
      default: "boolean",
    },
    target: {
      type: Number,
      default: 1,
      min: 1,
    },
    color: {
      type: String,
      enum: [
        "blue",
        "green",
        "red",
        "yellow",
        "purple",
        "indigo",
        "pink",
        "gray",
      ],
      default: "blue",
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
habitSchema.index({ userId: 1, isArchived: 1 });

module.exports = mongoose.model("Habit", habitSchema);
