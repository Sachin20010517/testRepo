var express = require('express');
var router = express.Router();

const controller = require("../controllers/receipt-controller");

router.route("/").post((req, res) => {
    controller.createReceipt(req, res);
})
router.route("/").get((req, res) => {
    controller.getReceipts(req, res);
})  

module.exports = router;