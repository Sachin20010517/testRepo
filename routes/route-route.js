const express = require("express");
const router = express.Router();
const controller = require("../controllers/route-controller");

router.route("/").post((req, res) => {
  controller.SaveRoute(req, res);
});

router.route("/").get((req, res) => {
  controller.getAllRoutes(req, res);
});

router.route("/:routeId").put((req, res) => {
  controller.updateRoute(req, res);
});

router.route("/:routeId").delete((req, res) => {
  controller.deleteRoute(req, res);
});

module.exports = router;
