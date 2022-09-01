var express = require("express");
const { body } = require("express-validator");
const {
  registerController,
  loginController,
  userController,
} = require("../controller/auth.controller");
var router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

// register route.
router.post(
  "/register",
  [
    body("name", "Must not be empty").trim().notEmpty(),
    body("email", "Enter a valid email").notEmpty().isEmail(),
    body("password", "Atleast 8 character long")
      .notEmpty()
      .isLength({ min: 8 }),
  ],
  registerController
);

// Login route.
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Atleaset 8 character long").isLength({ min: 8 }),
  ],
  loginController
);

// user detail
router.get("/user", authMiddleware, userController);

module.exports = router;
