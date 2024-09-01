const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({

    invoice_no: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: Date,
        required: true,
    },
    order_id: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true,
    },
    discount: {
        type: Number,
    },
    total: {
        type: Number,
    },
    delivery_charges: {
        type: Number,
    },
    paidAmount: {
        type: Number,
    },
    balance: {
        type: Number,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
   

},{timestamps:true})
module.exports = mongoose.model("invoice", invoiceSchema);
