const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    cPerson: {
      type: String,
    },
    cMobileNo: {
      type: String,
      required: true,
      unique: true,
    },
    remark: {
      type: String,
    },
    creditLimit: {
      type: Number,
    },
    orderedAmount: {
      type: Number,
    },
    paidAmount: {
      type: Number,
    },
    balance: {
      type: Number,
    },
    paymentType: {
      type: String,
    },
    walletBalance: {
      type: Number,
    },
    route:{
      ref: "route",
      type: Schema.Types.ObjectId,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);
