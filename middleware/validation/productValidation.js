const { check, validationResult } = require("express-validator");
const fs = require("fs");

const productValidation = [
  check("title")
    .notEmpty()
    .withMessage("Product Title is required!")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Product Title must be at least 1 chars long"),
  check("description")
    .notEmpty()
    .withMessage("Product Description is required!")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Product Description must be at least 5 chars long"),
  check("price")
    .notEmpty()
    .withMessage("Email address is required!")
    .isNumeric()
    .withMessage("Price will be Number!")
    .isLength({ min: 1 }),
  check("category").notEmpty().withMessage("category is required!"),
];

const productValidationResult = async (req, res, next) => {
  const errors = validationResult(req).mapped();

  if (Object.keys(errors).length > 0) {
    if (req.files.length > 0) {
      fs.unlinkSync(
        `${__dirname}/../../public/uploads/productImages/${req.files[0].filename}`
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

module.exports = { productValidation, productValidationResult };
