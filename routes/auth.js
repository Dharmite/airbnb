const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth_controller = require("../controllers/auth");
const auth_middleware = require("../middlewares/auth");

router.post("/register", auth_controller.register);

router.get("/profile", auth_middleware.isLoggedIn ,auth_controller.showProfile);

router.post('/login', passport.authenticate("local"), auth_controller.login);

module.exports = router;