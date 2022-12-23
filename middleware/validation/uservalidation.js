const { check, validationResult } = require("express-validator");
const fs = require("fs");
const User = require("../../models/user");

const userValidation = [
  check("firstName")
    .notEmpty()
    .withMessage("First name is required!")
    .trim()
    .isLength({ min: 5 })
    .withMessage("First name must be at least 5 chars long"),
  check("lastName")
    .notEmpty()
    .withMessage("Last name is required!")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Last name must be at least 5 chars long"),
  check("email")
    .notEmpty()
    .withMessage("Email address is required!")
    .isEmail()
    .withMessage("Please enter a valid email address!")
    .isLowercase()
    .withMessage("Email address will be lowercase!")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) throw Error("This email alrady userd!");
      } catch {
        throw Error("This email alrady userd!");
      }
    }),
  check("userRole").notEmpty().withMessage("User role is required!"),
  check("password")
    .notEmpty()
    .withMessage("Password is required!")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars long"),
];

const userValidationResult = async (req, res, next) => {
  const errors = validationResult(req).mapped();

  if (Object.keys(errors).length > 0) {
    if (req.files.length > 0) {
      fs.unlinkSync(
        `${__dirname}/../../public/uploads/images/${req.files[0].filename}`
      );
    }

    res.status(400).json({
      success: false,
      errors: errors,
    });
  } else {
    next();
  }
};

module.exports = { userValidation, userValidationResult };
