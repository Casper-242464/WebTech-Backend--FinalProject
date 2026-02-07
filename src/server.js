const app = require("./app");
const { connectDb } = require("./config/db");
const { env } = require("./config/env");

const startServer = async () => {
  try {
    await connectDb();
    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
