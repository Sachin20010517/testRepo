const GrnModel = require("../models/grn-model");
const ItemModel = require("../models/item-model");

async function saveGrn(req) {
  try {
    const grn = new GrnModel(req.body);
    const result = await grn.save();
    await updateQuantity(req);

    return { status: 200, result };
  } catch (err) {
    return { status: 400, error: err };
  }
}

async function getGrn(req) {
  try {
    const result = await GrnModel.find().sort({ createdAt: -1 });
    return { status: 200, result };
  } catch (err) {
    return { status: 400, error: err };
  }
}

async function updateQuantity(req) {
  try {
    for (let i = 0; i < req.body.items.length; i++) {
      const item = await ItemModel.findOne({
        _id: req.body.items[i].item,
      });
      const result = await ItemModel.updateOne(
        {
          _id: req.body.items[i].item,
        },
        {
          available_quantity:
            item.available_quantity + req.body.items[i].quantity,
        }
      );
    }
    return { status: 200, result };
  } catch (err) {
    return { status: 400, error: err };
  }
}

async function reduceQuantity(grn) {
  try {
    for (let i = 0; i < grn.items.length; i++) {
      const item = await ItemModel.findOne({
        _id: grn.items[i].item,
      });
      const result = await ItemModel.updateOne(
        {
          _id: grn.items[i].item,
        },
        { available_quantity: item.available_quantity - grn.items[i].quantity }
      );
    }
    return { status: 200 };
  } catch (err) {
    return { status: 400, error: err };
  }
}

async function updateGrn(req) {
  try {
    const grn = await GrnModel.findOne({
      _id: req.params.id,
    });
    const existingGrn = grn;
    const res = await reduceQuantity(existingGrn);

    const result = await GrnModel.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    updateQuantity(req);
    return { status: 200, result };
  } catch (err) {
    return { status: 400, error: err };
  }
}

async function deleteGrn(req) {
  try {
    const grn = await GrnModel.findOne({
      _id: req.params.id,
    });
    const existingGrn = grn;
    const result = await GrnModel.deleteOne({
      _id: req.params.id,
    });
    await reduceQuantity(existingGrn);
    return { status: 200, result };
  } catch (err) {
    return { status: 400, error: err };
  }
}

module.exports = {
  saveGrn,
  getGrn,
  updateGrn,
  deleteGrn,
  updateQuantity,
  reduceQuantity,
};
