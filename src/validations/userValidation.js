const Joi = require("joi");

const updateProfileSchema = Joi.object({
  username: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  bio: Joi.string().allow("").max(300).optional(),
  avatarUrl: Joi.string().uri().allow("").optional(),
});

module.exports = { updateProfileSchema };
