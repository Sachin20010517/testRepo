const Expense = require("../models/expenses-model");

async function addExpense(req) {
  try {
    const { date, purpose, other, amount } = req.body;
    const newExpense = new Expense({
      date,
      purpose,
      other,
      amount,
    });
    const savedExpense = await newExpense.save();
    return { status: 200, expense: savedExpense };
  } catch (err) {
    console.error("Error adding expense:", err);
    return { status: 500, error: err.message };
  }
}

async function getAllExpenses() {
  try {
    const expenses = await Expense.find();
    return { status: 200, expenses };
  } catch (error) {
    console.error("Error getting all expenses:", error);
    return { status: 500, error: error.message };
  }
}

async function updateExpenseById(expenseId, updates) {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, updates, {
      new: true,
    });
    if (!updatedExpense) {
      throw new Error(`Expense with ID '${expenseId}' not found`);
    }
    return {
      status: 200,
      message: `Expense with ID '${expenseId}' updated successfully`,
      expense: updatedExpense,
    };
  } catch (error) {
    console.error("Error updating expense:", error);
    return { status: 500, error: "Error updating expense" };
  }
}

async function deleteExpenseById(expenseId) {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      throw new Error(`Expense with ID '${expenseId}' not found`);
    }
    return {
      status: 200,
      message: `Expense with ID '${expenseId}' deleted successfully`,
    };
  } catch (error) {
    console.error("Error deleting expense:", error);
    return { status: 500, error: error.message };
  }
}

module.exports = {
  addExpense,
  getAllExpenses,
  updateExpenseById,
  deleteExpenseById,
};
