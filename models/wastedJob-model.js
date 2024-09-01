const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wastedJobSchema = new Schema({
  type: {
    type: String,
  },
  reason: {
    type: String,
  },
  jobId: {
    type: Schema.Types.ObjectId,
    ref: "job",
  },
  items: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: "item",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("wastedJob", wastedJobSchema);
