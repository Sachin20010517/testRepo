var express = require('express');
var router = express.Router();

const controller = require("../controllers/customer-controller");


router.route("/").post((req, res) => {
    controller.CreateCustomer(req, res);
})

router.route("/").get((req, res) => {
    controller.getAllCustomer(req, res);
})

router.route("/:id").put((req, res) => {
    controller.updateCustomer(req,res);
})

router.route("/:id").delete((req, res) => {
    controller.deleteCustomer(req,res);
})


module.exports = router;