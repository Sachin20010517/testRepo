var express = require("express");
var router = express.Router();

const controller = require("../controllers/report-controller");

router.route("/").post((req, res) => {
  controller.getInvoiceByCuzAndDate(req, res);
});

module.exports = router;