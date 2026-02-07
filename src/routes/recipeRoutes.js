const express = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const {
  createRecipeSchema,
  updateRecipeSchema,
} = require("../validations/recipeValidation");

const router = express.Router();

router.post("/", protect, validate(createRecipeSchema), createRecipe);
router.get("/", protect, getRecipes);
router.get("/:id", protect, getRecipeById);
router.put("/:id", protect, validate(updateRecipeSchema), updateRecipe);
router.delete("/:id", protect, deleteRecipe);

module.exports = router;
