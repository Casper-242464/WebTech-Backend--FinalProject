const Recipe = require("../models/Recipe");
const { asyncHandler } = require("../utils/asyncHandler");

const normalizeIngredients = (ingredients) => {
  if (Array.isArray(ingredients)) {
    return ingredients;
  }
  return String(ingredients)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const createRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.create({
    ...req.body,
    ingredients: normalizeIngredients(req.body.ingredients),
    category: req.body.categoryId || undefined,
    author: req.user._id,
  });

  res.status(201).json(recipe);
});

const getRecipes = asyncHandler(async (req, res) => {
  const filters = { author: req.user._id };

  if (req.query.title) {
    filters.title = new RegExp(req.query.title, "i");
  }
  if (req.query.ingredient) {
    filters.ingredients = new RegExp(req.query.ingredient, "i");
  }
  if (req.query.maxTime) {
    filters.cookTimeMinutes = { $lte: Number(req.query.maxTime) };
  }
  if (req.query.maxCalories) {
    filters.calories = { $lte: Number(req.query.maxCalories) };
  }

  const recipes = await Recipe.find(filters)
    .populate("author", "username email")
    .populate("category", "name");

  res.json(recipes);
});

const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({
    _id: req.params.id,
    author: req.user._id,
  }).populate("category", "name");

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  res.json(recipe);
});

const updateRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findOne({
    _id: req.params.id,
    author: req.user._id,
  });

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  Object.assign(recipe, {
    ...req.body,
    ingredients: req.body.ingredients
      ? normalizeIngredients(req.body.ingredients)
      : recipe.ingredients,
    category: req.body.categoryId || recipe.category,
  });

  const updated = await recipe.save();
  res.json(updated);
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  if (recipe.author.toString() !== req.user._id.toString() && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }

  await recipe.deleteOne();
  res.json({ message: "Recipe deleted" });
});

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
