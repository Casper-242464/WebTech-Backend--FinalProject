const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { env } = require("../config/env");
const { asyncHandler } = require("../utils/asyncHandler");

const signToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const user = await User.create({ username, email, password, role });
  const token = signToken(user._id);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id);
  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

module.exports = { register, login };
