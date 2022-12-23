const { check, validationResult } = require("express-validator");

const loginUserDataValidation = [
  check("email")
    .notEmpty()
    .withMessage("Email address is required!")
    .trim()
    .isEmail()
    .withMessage("Please enter a valide email address!")
    .isLowercase()
    .withMessage("Email address will be lowercase!"),
  check("password").notEmpty().withMessage("Password is required!"),
];

const loginUserDataValidationResult = (req, res, next) => {
  const errors = validationResult(req).mapped();

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      success: false,
      errors: errors,
    });
  } else {
    next();
  }
};

module.exports = { loginUserDataValidation, loginUserDataValidationResult };
