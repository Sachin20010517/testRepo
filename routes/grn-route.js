var express = require('express');
var router = express.Router();

const controller = require("../controllers/grn-controller");


router.route("/").post((req, res) => {
    controller.createGrn(req, res);
})

router.route("/").get((req, res) => {
    controller.getAllGrn(req, res);
})

router.route("/:id").put((req, res) => {
    controller.updateGrn(req, res);
})

router.route("/:id").delete((req, res) => {
    controller.deleteGrn(req, res);
})


module.exports = router;