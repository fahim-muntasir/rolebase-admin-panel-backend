const routes = require("express").Router();

// IMPORT ALL CONTROLLER
const { addUser, getUsers, getUsersByRole } = require("../controller/user");
const { loginController, logoutController } = require("../controller/login");
const checkLoginController = require("../controller/checkLogin");
const {
  addProduct,
  getProducts,
  getProductsByStatus,
  updateProduct,
  updateProductImg,
} = require("../controller/product");

// IMPORT ALL MIDDLEWARE
const {
  userValidation,
  userValidationResult,
} = require("../middleware/validation/uservalidation");
const userAvatarUpload = require("../middleware/avatarUploader/userAvatar");
const {
  loginUserDataValidation,
  loginUserDataValidationResult,
} = require("../middleware/validation/loginDatavalidation");
const checkLogin = require("../middleware/common/checkLogin");
const productAvatarUpload = require("../middleware/avatarUploader/productAvatar");
const {
  productValidation,
  productValidationResult,
} = require("../middleware/validation/productValidation");
const {
  checkRoleForUpdateProductImg,
} = require("../middleware/common/checkRole");

// GET USER ROUTE
routes.get("/users/all", getUsers);
routes.get("/users/:role", getUsersByRole);

// CREATE USER ROUTE
routes.post(
  "/user",
  userAvatarUpload,
  userValidation,
  userValidationResult,
  addUser
);

// CREATE PRODUCT ROUTE
routes.post(
  "/product",
  checkLogin,
  productAvatarUpload,
  productValidation,
  productValidationResult,
  addProduct
);

// GET PRODUCTS ROUTE
routes.get("/products/all", getProducts);
routes.get("/products/:status", getProductsByStatus);

// UPDATE PRODUCT ROTE
routes.put("/product/:id", checkLogin, updateProduct);
routes.put(
  "/product/image/:id",
  checkLogin,
  checkRoleForUpdateProductImg,
  productAvatarUpload,
  updateProductImg
);

// LOGIN ROUTE
routes.post(
  "/login",
  loginUserDataValidation,
  loginUserDataValidationResult,
  loginController
);

// CHECK LOGIN
routes.post("/login/check", checkLogin, checkLoginController);

// LOGOUT ROUTE
routes.delete("/logout", logoutController);

module.exports = routes;
