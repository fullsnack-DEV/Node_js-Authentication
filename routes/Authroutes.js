const express = require("express");

//importing a router

const router = express.Router();

//importing Controllers

const {
  Register,
  Login,
  forgotPassword,
  resetPassword,
} = require("../controllers/AuthController");

//Mounting the router

router.route("/Register").post(Register);
router.route("/Login").post(Login);
router.route("/ForgotPassword").post(forgotPassword);
router.route("/ResetPassword/:resetToken").put(resetPassword);

module.exports = router;
