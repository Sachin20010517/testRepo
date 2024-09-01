"use strict";
var ItemService = require("../services/item-service");
var response = require("../utils/response-utils");

async function createItem(req, res) {
    try {
        const result = await ItemService.saveItem(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Item saved successfully", result, res);
        }
        else {
            if (result.error.code == 11000) {
                return response.sendBadRequestResponse("item already exist", null, result.error, res)
            }
            return response.sendBadRequestResponse("Error while saving item", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while saving item", null, err, res);
    }
}

async function getAllItems(req, res) {
    try {
        const result = await ItemService.getItems(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Items retrieved successfully", result, res);
        }

        else {
            return response.sendBadRequestResponse("Error while retrieving items", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while retrieving items", null, err, res);
    }
}

async function updateItem(req, res) {
    try {
        const result = await ItemService.updateItem(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Item updated successfully", result, res);
        }
        else {
            if (result.error.code == 11000) {
                return response.sendBadRequestResponse("Item already exist", null, result.error, res);
            }
            return response.sendBadRequestResponse("Error while updating item", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while updating item", null, err, res);
    }
}
async function deleteItem(req, res) {
    try {
        const result = await ItemService.deleteItem(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Item deleted successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while deleting item", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while deleting item", null, err, res);
    }
}

module.exports = {
    createItem,
    getAllItems,
    updateItem,
    deleteItem,
};