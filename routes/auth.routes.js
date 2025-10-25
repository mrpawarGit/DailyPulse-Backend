const express = require("express");
const { body } = require("express-validator");
const {
  signup,
  login,
  getMe,
  updateProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validateRequest");

const router = express.Router();

// Validation rules
const signupValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Public routes
router.post("/signup", signupValidation, validate, signup);
router.post("/login", loginValidation, validate, login);

// Protected routes
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);

module.exports = router;
