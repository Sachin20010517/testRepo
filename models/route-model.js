const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const routeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("route", routeSchema);
