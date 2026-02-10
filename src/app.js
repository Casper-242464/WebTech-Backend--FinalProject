const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const pageRoutes = require("./routes/pageRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const { optionalAuth } = require("./middleware/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(optionalAuth);

app.use("/", pageRoutes);
app.use("/", authRoutes);
app.use("/users", userRoutes);
app.use("/recipes", recipeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
