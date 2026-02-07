const Recipe = require("../models/Recipe");

const normalizeIngredients = (ingredients) => {
  if (Array.isArray(ingredients)) {
    return ingredients;
  }
  return String(ingredients)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const createRecipeForUser = async (userId, data) =>
  Recipe.create({
    ...data,
    ingredients: normalizeIngredients(data.ingredients),
    category: data.categoryId || undefined,
    author: userId,
  });

const getRecipesForUser = async (userId, query) => {
  const filters = { author: userId };

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

  return Recipe.find(filters)
    .populate("author", "username email")
    .populate("category", "name");
};

const getRecipeByIdForUser = async (userId, recipeId) =>
  Recipe.findOne({ _id: recipeId, author: userId }).populate("category", "name");

const updateRecipeForUser = async (userId, recipeId, data) => {
  const recipe = await Recipe.findOne({ _id: recipeId, author: userId });

  if (!recipe) {
    const error = new Error("Recipe not found");
    error.status = 404;
    throw error;
  }

  Object.assign(recipe, {
    ...data,
    ingredients: data.ingredients
      ? normalizeIngredients(data.ingredients)
      : recipe.ingredients,
    category: data.categoryId || recipe.category,
  });

  return recipe.save();
};

const deleteRecipeById = async (userId, role, recipeId) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    const error = new Error("Recipe not found");
    error.status = 404;
    throw error;
  }

  if (recipe.author.toString() !== userId.toString() && role !== "admin") {
    const error = new Error("Forbidden");
    error.status = 403;
    throw error;
  }

  await recipe.deleteOne();
  return { message: "Recipe deleted" };
};

module.exports = {
  createRecipeForUser,
  getRecipesForUser,
  getRecipeByIdForUser,
  updateRecipeForUser,
  deleteRecipeById,
};
