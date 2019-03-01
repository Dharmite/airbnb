const express = require("express");
const router = express.Router();
const home_controller = require("../controllers/home");
const auth_middleware = require("../middlewares/auth");

router.get("/rooms/:room_id", home_controller.showHome);

router.get("/rooms/plus/:room_id", home_controller.showPlusHome);

router.get(
  "/:city/homes/new",
  auth_middleware.isLoggedIn,
  home_controller.showCreateHome
);

router.post("/:city/homes", home_controller.createHome);

router.get(
  "/rooms/:room_id/edit",
  auth_middleware.isLoggedIn,
  auth_middleware.isHomeHost,
  home_controller.showEditPage
);

router.put(
  "/rooms/:room_id/",
  auth_middleware.isLoggedIn,
  auth_middleware.isHomeHost,
  home_controller.editPage
);

router.delete(
  "/rooms/:room_id/",
  auth_middleware.isLoggedIn,
  auth_middleware.isHomeHost,
  home_controller.deletePage
);

module.exports = router;
