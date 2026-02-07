const { asyncHandler } = require("../utils/asyncHandler");
const User = require("../models/User");

const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  res.json(user);
});

module.exports = { getProfile, updateProfile };
