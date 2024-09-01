const express = require('express');
const router = express.Router();
const controller = require('../controllers/expenses-controller');

router.route("/").post((req, res) => {
    controller.addExpense(req, res);
});

router.route("/").get((req, res) => {
    controller.getAllExpenses(req, res);
});

router.route("/:expenseId").put((req, res) => {
    controller.updateExpense(req, res);
});

router.route("/:expenseId").delete((req, res) => {
    controller.deleteExpense(req, res);
});

module.exports = router;
