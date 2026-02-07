const { asyncHandler } = require("../utils/asyncHandler");
const {
  createRecipeForUser,
  getRecipesForUser,
  getRecipeByIdForUser,
  updateRecipeForUser,
  deleteRecipeById,
} = require("../services/recipeService");

const createRecipe = asyncHandler(async (req, res) => {
  const recipe = await createRecipeForUser(req.user._id, req.body);
  res.status(201).json(recipe);
});

const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await getRecipesForUser(req.user._id, req.query);
  res.json(recipes);
});

const getRecipeById = asyncHandler(async (req, res) => {
  const recipe = await getRecipeByIdForUser(req.user._id, req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json(recipe);
});

const updateRecipe = asyncHandler(async (req, res) => {
  const updated = await updateRecipeForUser(req.user._id, req.params.id, req.body);
  res.json(updated);
});

const deleteRecipe = asyncHandler(async (req, res) => {
  const result = await deleteRecipeById(req.user._id, req.user.role, req.params.id);
  res.json(result);
});

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
