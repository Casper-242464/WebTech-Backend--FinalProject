const { asyncHandler } = require("../utils/asyncHandler");
const {
  getHomeRecipes,
  getProfileData,
  getRecipeDetail,
} = require("../services/pageService");

const renderHome = asyncHandler(async (req, res) => {
  const recipes = await getHomeRecipes(req.query);

  res.render("pages/index", {
    title: "Recipe Board",
    recipes,
    filters: req.query,
    user: req.user || null,
  });
});

const renderProfile = asyncHandler(async (req, res) => {
  const { user, recipes } = await getProfileData(req.user._id);

  res.render("pages/profile", {
    title: "Profile",
    user,
    recipes,
    currentUser: req.user,
  });
});

const renderRecipeDetail = asyncHandler(async (req, res) => {
  const recipe = await getRecipeDetail(req.params.id);

  if (!recipe) {
    res.status(404);
    return res.render("pages/error", {
      title: "Not Found",
      status: 404,
      message: "Recipe not found",
      user: req.user || null,
    });
  }

  res.render("pages/recipe-detail", {
    title: recipe.title,
    recipe,
    user: req.user || null,
  });
});

const renderRecipeCreate = asyncHandler(async (req, res) => {
  res.render("pages/recipe-create", {
    title: "Create Recipe",
    user: req.user || null,
  });
});

const renderLogin = (req, res) => {
  res.render("pages/login", { 
    title: "Login",
    errors: [],
    formData: {},
    user: req.user || null,
  });
};

const renderRegister = (req, res) => {
  res.render("pages/register", { 
    title: "Register",
    errors: [],
    formData: {},
    user: req.user || null,
  });
};

module.exports = {
  renderHome,
  renderProfile,
  renderRecipeDetail,
  renderRecipeCreate,
  renderLogin,
  renderRegister,
};
