var express = require('express');
var router = express.Router();

const controller = require("../controllers/item-controller");


router.route("/").post((req, res) => {
    controller.createItem(req, res);
})

router.route("/").get((req, res) => {
    controller.getAllItems(req, res);
})

router.route("/:id").put((req, res) => {
    controller.updateItem(req, res);
})

router.route("/:id").delete((req, res) => {
    controller.deleteItem(req, res);
})


module.exports = router;