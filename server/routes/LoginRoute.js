const express = require("express");
const router = express.Router();
const IsAuthenticated = require("../middleware/IsAuthenticated");
const {
  LoginUser,
  RegisterUser,
  LogoutUser,
} = require("../controllers/AuthController");

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.post("/logout", IsAuthenticated, LogoutUser);

module.exports = router;
