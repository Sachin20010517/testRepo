var express = require("express");
var router = express.Router();

const controller = require("../controllers/invoice-controller");

router.route("/").get((req, res) => {
  controller.getAllInvoices(req, res);
});
router.route("/charges/:id").patch((req, res) => {
  controller.updateDeliveryAndDiscount(req, res);
});
router.route("/customer/:id").get((req, res) => {
  controller.getInvoiceByCustomerId(req, res);
});
router.route("/").patch((req, res) => {
  controller.updateInvoice(req, res);
});

module.exports = router;
