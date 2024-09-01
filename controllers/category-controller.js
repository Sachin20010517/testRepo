"use strict";

var CategoryService = require("../services/category-service");
var response = require("../utils/response-utils");
async function CreateCategory(req, res) {

    try {
        const result = await CategoryService.SaveCategory(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Category saved successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while saving category", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while saving category", null, err, res);
    }
}

async function getAllCategories(req, res) {
    try {
        const result = await CategoryService.getAllCategories();
        if (result.status === 200) {
            return response.sendSuccessResponse("Categories fetched successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while fetching category", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while fetching category", null, err, res);
    }
}

async function updateCategory(req, res) {

    try {
        const result = await CategoryService.updateCategory(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Category Updated Successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while updating category", null, result.error, res);
        }
    } catch (err) {
        console.log(err);
        // return response.sendServerErrorResponse("Error while updating category",null,err,res);
    }
}

async function deleteCategory(req, res) {
    try {
        const result = await CategoryService.deleteCategory(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Category deleted Successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while deleting category", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while deleting category", null, err, res);
    }
}



module.exports = {
    CreateCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};