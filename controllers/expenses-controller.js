"use strict";
const ExpenseService = require('../services/expenses-service');
const response = require("../utils/response-utils");

async function addExpense(req, res) {
    try {
        console.log(req.body);
        const result = await ExpenseService.addExpense(req);
        console.log(result);
        if (result.status === 200) {
            return response.sendSuccessResponse("Expense added successfully", result, res);
        } else {
            return response.sendBadRequestResponse("Error while adding expense", null, result.error, res);
        }
    } catch (err) {
        return response.sendServerErrorResponse("Error while adding expense", null, err, res);
    }
}

async function getAllExpenses(req, res) {
    try {
        const result = await ExpenseService.getAllExpenses();
        return response.sendSuccessResponse("All expenses retrieved successfully", result, res);
    } catch (err) {
        return response.sendServerErrorResponse("Error getting all expenses", null, err, res);
    }
}



async function updateExpense(req, res) {
    try {
        const { expenseId } = req.params;
        const updates = req.body;
        const result = await ExpenseService.updateExpenseById(expenseId, updates);
        if (result.status === 200) {
            return response.sendSuccessResponse(result.message, result.expense, res);
        } else {
            return response.sendErrorResponse(result.status, result.error, res);
        }
    } catch (err) {
        console.error("Error updating expense:", err);
        return response.sendServerErrorResponse("Error updating expense", null, err, res);
    }
}

async function deleteExpense(req, res) {
    try {
        const { expenseId } = req.params;
        const result = await ExpenseService.deleteExpenseById(expenseId);
        if (result.status === 200) {
            return response.sendSuccessResponse(result.message, null, res);
        } else {
            return response.sendBadRequestResponse(result.message, null, result.error, res);
        }
    } catch (err) {
        return response.sendServerErrorResponse("Error deleting expense", null, err, res);
    }
}

module.exports = {
    addExpense,
    getAllExpenses,
    updateExpense,
    deleteExpense
};
