const ItemModel = require('../models/item-model');


async function saveItem(req) {
    try {
        const item = new ItemModel(req.body);
        const result = await item.save();
        return { status: 200, result };
    }
    catch (err) {
        if (err.code == 11000) {
            return { status: 400, error: { code: 11000, message: "Item already exists" } };
        }
        else {
            return { status: 400, error: err }
        }
    }
}

async function getItems(req) {
    try {
        const result = await ItemModel.find().sort({ createdAt: -1 });
        return { status: 200, result };
    }
    catch (err) {
        return { status: 400, error: err };
    }
}
async function updateItem(req) {
    try {
        req.body.available_quantity= req.body.starting_quantity;
        const result = await ItemModel.updateOne({
            _id: req.params
                .id
        }, req.body);
        return { status: 200, result };
    }
    catch (err) {
        return { status: 400, error: err };
    }
}

async function deleteItem(req) {
    try {
        const result = await ItemModel.deleteOne({
            _id: req.params
                .id
        });
        return { status: 200, result };
    }
    catch (err) {
        return { status: 400, error: err };
    }
}

module.exports = {
    saveItem,
    getItems,
    updateItem,
    deleteItem,
};
