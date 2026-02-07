const { asyncHandler } = require("../utils/asyncHandler");
const { registerUser, loginUser } = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  const payload = await registerUser(req.body);
  res.status(201).json(payload);
});

const login = asyncHandler(async (req, res) => {
  const payload = await loginUser(req.body);
  res.json(payload);
});

module.exports = { register, login };
