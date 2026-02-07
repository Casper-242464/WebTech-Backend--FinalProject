const Joi = require("joi");

const createRecipeSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").max(1000).optional(),
  ingredients: Joi.alternatives()
    .try(Joi.array().items(Joi.string().min(1)).min(1), Joi.string().min(1))
    .required(),
  cookTimeMinutes: Joi.number().min(1).required(),
  calories: Joi.number().min(0).required(),
  imageUrl: Joi.string().uri().allow("").optional(),
  categoryId: Joi.string().hex().length(24).optional(),
});

const updateRecipeSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow("").max(1000).optional(),
  ingredients: Joi.alternatives()
    .try(Joi.array().items(Joi.string().min(1)).min(1), Joi.string().min(1))
    .optional(),
  cookTimeMinutes: Joi.number().min(1).optional(),
  calories: Joi.number().min(0).optional(),
  imageUrl: Joi.string().uri().allow("").optional(),
  categoryId: Joi.string().hex().length(24).optional(),
});

module.exports = { createRecipeSchema, updateRecipeSchema };
