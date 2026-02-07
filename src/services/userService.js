const User = require("../models/User");

const getProfileById = async (userId) =>
  User.findById(userId).select("-password");

const updateProfileById = async (userId, updates) =>
  User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

module.exports = { getProfileById, updateProfileById };
