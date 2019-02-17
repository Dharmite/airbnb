const express = require("express");
const router = express.Router();

const location_controller = require("../controllers/location");

router.get("/s/:city/all", location_controller.showAll);

router.get("/:city/homes", location_controller.showHomes);

module.exports = router;
