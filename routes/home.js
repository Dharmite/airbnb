const express = require("express");
const router = express.Router();
const home_controller = require('../controllers/home');

// route that shows the individual home
router.get("/rooms/:room_id", home_controller.showHome);

router.get("/rooms/plus/:room_id", home_controller.showPlusHome);

router.get("/:city/homes/new", home_controller.showCreateHome);

router.post("/:city/homes", home_controller.createHome);

module.exports = router;