const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const details = error.details.map((detail) => detail.message);
    
    if (req.accepts(["json", "html"]) === "html") {
      req.validationErrors = details;
      return next();
    }
    
    return res.status(400).json({
      message: "Validation error",
      details,
    });
  }

  req.body = value;
  next();
};

module.exports = { validate };
