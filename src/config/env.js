const path = require("path");
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

const env = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/recipe_share",
  jwtSecret: process.env.JWT_SECRET || "dev_secret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

module.exports = { env };
