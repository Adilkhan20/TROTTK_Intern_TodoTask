const express = require("express");
const router = express.Router();
const { LoginUser } = require("../controllers/LoginController");
const { RegisterUser } = require("../controllers/RegisterController");
const { LogoutUser } = require("../controllers/Logout");
const IsAuthenticated = require("../middleware/IsAuthenticated");

router.post("/login", LoginUser);
router.post("/register", RegisterUser);
router.post("/logout", IsAuthenticated, LogoutUser);

module.exports = router;
