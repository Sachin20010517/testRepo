const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    job_No: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    customer: {
      customerId: {
        type: Schema.Types.ObjectId,
        ref: "customer",
        required: true,
      },
      cNumber: {
        type: String,
        required: true,
      },
      cName: {
        type: String,
        required: true,
      },
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "item",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    remark: {
      type: String,
    },
    created_by: {
      type: String,
    },
    order_type: {
      type: String,
      required: true,
    },
    delivery_type: {
      type: String,
      required: true,
    },
    isUrgent: {
      type: Boolean,
    },
    isFast: {
      type: Boolean,
    },
    additional_charges: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    delivery_charges: {
      type: Number,
    },
    paid_amount: {
      type: Number,
    },
    designBy: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("job", jobSchema);
