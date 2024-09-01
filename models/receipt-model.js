const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const receiptSchema = new Schema(
  {
    receipt_no: {
      type: String,
      required: true,
    },
    receipt_date: {
      type: Date,
      required: true,
    },
    receipt_amount: {
      type: Number,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },
    payment_method: {
      type: {
        method: {
          type: String,
          required: true,
        },
        details: {
          cheque_no: String,
          bank: String,
          date: Date,
          bank_branch: String,
          ref_no: String,
        },
      },
      required: true,
    },
    order: {
      type: Schema.Types.ObjectId,
      ref: "order",
    },
    remarks: {
      type: String,
    },
    collected_by: {
      type: String,
      required: true,
    },
    invoice: [
      {
        inv_id: {
          type: Schema.Types.ObjectId,
          ref: "invoice",
          required: true,
        },
        paidAmount: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("receipt", receiptSchema);
