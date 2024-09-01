const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chequeSchema = new Schema({
    cheque_no: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },
    status: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
    },
    banked_by: {
        type : String,
    }


}, { timestamps: true })

module.exports = mongoose.model("cheque", chequeSchema);
