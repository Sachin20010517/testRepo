const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  purpose: {
    type: String,
    required: true,
  },
  other: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
