const app = require("./app");
const { connectDb } = require("./config/db");
const { env } = require("./config/env");

const startServer = async () => {
  try {
    await connectDb();
    app.listen(env.port, () => {
      const serverUrl = `http://localhost:${env.port}`;
      console.log(`\n✓ Server running at: ${serverUrl}\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
