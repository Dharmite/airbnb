const express = require("express");
const router = express.Router();

const general_controller = require('../controllers/generalPages');


router.get("/", general_controller.showHomepage);

router.get("/help", general_controller.showHelp);

module.exports = router;
