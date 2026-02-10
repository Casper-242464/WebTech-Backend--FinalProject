const Recipe = require("../models/Recipe");
const User = require("../models/User");

const getHomeRecipes = async (query) => {
  const filters = {};

  if (query.title) {
    filters.title = new RegExp(query.title, "i");
  }
  if (query.ingredient) {
    filters.ingredients = new RegExp(query.ingredient, "i");
  }
  if (query.maxTime) {
    filters.cookTimeMinutes = { $lte: Number(query.maxTime) };
  }
  if (query.maxCalories) {
    filters.calories = { $lte: Number(query.maxCalories) };
  }
  if (query.category) {
    filters.category = query.category;
  }

  return Recipe.find(filters)
    .populate("author", "username")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(24);
};

const getProfileData = async (userId) => {
  const user = await User.findById(userId).select("-password");
  const recipes = await Recipe.find({ author: userId }).sort({ createdAt: -1 });
  return { user, recipes };
};

const getRecipeDetail = async (recipeId) =>
  Recipe.findById(recipeId)
    .populate("author", "username")
    .populate("category", "name");

module.exports = { getHomeRecipes, getProfileData, getRecipeDetail };
