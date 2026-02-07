const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

const errorHandler = (err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  const payload = { message: err.message || "Server error" };

  if (req.accepts(["json", "html"]) === "html") {
    return res.status(status).render("pages/error", {
      title: "Error",
      status,
      message: payload.message,
    });
  }

  return res.status(status).json(payload);
};

module.exports = { notFound, errorHandler };
