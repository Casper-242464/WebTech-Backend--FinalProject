const { asyncHandler } = require("../utils/asyncHandler");
const { getProfileById, updateProfileById } = require("../services/userService");

const getProfile = asyncHandler(async (req, res) => {
  const user = await getProfileById(req.user._id);
  res.json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await updateProfileById(req.user._id, req.body);
  res.json(user);
});

module.exports = { getProfile, updateProfile };
