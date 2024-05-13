const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
} = require("../controllers/user.Controller");
const validateToken = require("../middleware/validedTokenHandler");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", validateToken, userProfile);

module.exports = router;
