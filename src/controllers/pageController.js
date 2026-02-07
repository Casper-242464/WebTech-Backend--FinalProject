const Recipe = require("../models/Recipe");
const User = require("../models/User");
const { asyncHandler } = require("../utils/asyncHandler");

const renderHome = asyncHandler(async (req, res) => {
  const filters = {};

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
    .populate("author", "username")
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(24);

  res.render("pages/index", {
    title: "Recipe Board",
    recipes,
    filters: req.query,
  });
});

const renderProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const recipes = await Recipe.find({ author: req.user._id }).sort({ createdAt: -1 });

  res.render("pages/profile", {
    title: "Profile",
    user,
    recipes,
  });
});

const renderRecipeDetail = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
    .populate("author", "username")
    .populate("category", "name");

  if (!recipe) {
    res.status(404);
    return res.render("pages/error", {
      title: "Not Found",
      status: 404,
      message: "Recipe not found",
    });
  }

  res.render("pages/recipe-detail", {
    title: recipe.title,
    recipe,
  });
});

const renderRecipeCreate = asyncHandler(async (req, res) => {
  res.render("pages/recipe-create", {
    title: "Create Recipe",
  });
});

const renderLogin = (req, res) => {
  res.render("pages/login", { title: "Login" });
};

const renderRegister = (req, res) => {
  res.render("pages/register", { title: "Register" });
};

module.exports = {
  renderHome,
  renderProfile,
  renderRecipeDetail,
  renderRecipeCreate,
  renderLogin,
  renderRegister,
};
