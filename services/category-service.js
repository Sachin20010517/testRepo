const Category = require('../models/category-model');

async function SaveCategory(req) {
    try {
        const category = new Category({
            name: req.body.name,
            description: req.body.description
        });
        const result = await category.save();
        return { status: 200, data: result };
    }
    catch (err) {
        return { status: 500, error: err };
    }
}

async function getAllCategories() {
    try {
        const result = await Category.find().sort({createdAt:-1});
        return { status: 200, data: result };
    }
    catch (err) {
        return { status: 500, error: err };
    }
}

async function updateCategory(req) {
    try {
        const result = await Category.updateOne({ _id: req.params.id }, { $set: { name: req.body.name, description: req.body.description } });
        return { status: 200, data: result };
    } catch (err) {
        return { status: 500, error: err };
    }
}

async function deleteCategory(req) {
    try {
        const result = await Category.deleteOne({ _id: req.params.id });
        return { status: 200, data: result };
    } catch (err) {
        return { status: 500, error: err };
    }
}

module.exports = {
    SaveCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};