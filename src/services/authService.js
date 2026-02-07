const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { env } = require("../config/env");

const signToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

const registerUser = async ({ username, email, password, role }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("Email already registered");
    error.status = 400;
    throw error;
  }

  const user = await User.create({ username, email, password, role });
  const token = signToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const token = signToken(user._id);
  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = { registerUser, loginUser };
