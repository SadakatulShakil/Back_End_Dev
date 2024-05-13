const express = require("express");
const {
  registerUser,
  loginUser,
  userProfile,
} = require("../controllers/user.Controller");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", userProfile);

module.exports = router;
