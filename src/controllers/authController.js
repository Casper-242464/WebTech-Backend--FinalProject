const { asyncHandler } = require("../utils/asyncHandler");
const { registerUser, loginUser } = require("../services/authService");

const register = asyncHandler(async (req, res) => {
  if (req.validationErrors) {
    return res.status(400).render("pages/register", {
      title: "Register",
      errors: req.validationErrors,
      formData: req.body,
    });
  }

  try {
    const payload = await registerUser(req.body);
    
    if (req.accepts(["json", "html"]) === "html") {
      res.cookie("token", payload.token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.redirect("/login");
    }
    
    res.status(201).json(payload);
  } catch (error) {
    if (req.accepts(["json", "html"]) === "html") {
      return res.status(error.status || 400).render("pages/register", {
        title: "Register",
        errors: [error.message],
        formData: req.body,
      });
    }
    throw error;
  }
});

const login = asyncHandler(async (req, res) => {
  if (req.validationErrors) {
    return res.status(400).render("pages/login", {
      title: "Login",
      errors: req.validationErrors,
      formData: req.body,
    });
  }

  try {
    const payload = await loginUser(req.body);
    
    if (req.accepts(["json", "html"]) === "html") {
      res.cookie("token", payload.token, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.redirect("/");
    }
    
    res.json(payload);
  } catch (error) {
    if (req.accepts(["json", "html"]) === "html") {
      return res.status(error.status || 400).render("pages/login", {
        title: "Login",
        errors: [error.message],
        formData: req.body,
      });
    }
    throw error;
  }
});

const logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
};

module.exports = { register, login, logout };
