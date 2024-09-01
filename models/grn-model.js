const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const grnSchema = new Schema({
    grn_no: {
        type: String,
        required: true,
        unique: true,
    },
    grn_date: {
        type: Date,
        required: true,
    },
    receivedBy: {
        type: String,
        required: true,
    },

    items: [{
        item: {
            type: Schema.Types.ObjectId,
            ref: 'item',
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        cost: {
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    }],
    total_cost: {
        type: Number,
        required: true,
    },
    remark: {
        type: String,
    },
},{timestamps:true});

module.exports = mongoose.model("grn", grnSchema);