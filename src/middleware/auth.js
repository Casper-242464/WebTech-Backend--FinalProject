const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const User = require("../models/User");

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  let token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  // Check for token in cookies if not in header
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    if (req.accepts("html")) {
      return res.redirect("/login");
    }
    return res.status(401).json({ message: "Missing authorization token" });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      if (req.accepts("html")) {
        return res.redirect("/login");
      }
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (req.accepts("html")) {
      return res.redirect("/login");
    }
    return res.status(401).json({ message: "Unauthorized" });
  }
};

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  let token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  // Check for token in cookies if not in header
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      const user = await User.findById(decoded.id).select("-password");
      if (user) {
        req.user = user;
      }
    } catch (error) {
      // Token is invalid or expired, continue without setting req.user
    }
  }

  next();
};

module.exports = { protect, optionalAuth };
