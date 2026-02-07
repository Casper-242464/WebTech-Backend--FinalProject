const express = require("express");
const {
  renderHome,
  renderProfile,
  renderRecipeDetail,
  renderRecipeCreate,
  renderLogin,
  renderRegister,
} = require("../controllers/pageController");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", renderHome);
router.get("/recipes/new", protect, renderRecipeCreate);
router.get("/recipes/:id/view", renderRecipeDetail);
router.get("/profile", protect, renderProfile);
router.get("/login", renderLogin);
router.get("/register", renderRegister);

module.exports = router;
