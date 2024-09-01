"use strict";
var GrnService = require("../services/grn-service");
var response = require("../utils/response-utils");

async function createGrn(req, res) {
    try {
        const result = await GrnService.saveGrn(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Grn saved successfully", result, res);
        }
        else {
            if (result.error.code == 11000) {
                return response.sendBadRequestResponse("Grn already exist", null, result.error, res)
            }
            return response.sendBadRequestResponse("Error while saving grn", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while saving grn", null, err, res);
    }
}

async function getAllGrn(req, res) {
    try {
        const result = await GrnService.getGrn(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Grn retrieved successfully", result, res);
        }

        else {
            return response.sendBadRequestResponse("Error while retrieving grn", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while retrieving grn", null, err, res);
    }
}

async function updateGrn(req, res) {
    try {
        const result = await GrnService.updateGrn(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Grn updated successfully", result, res);
        }
        else {
            if (result.error.code == 11000) {
                return response.sendBadRequestResponse("Grn already exist", null, result.error, res);
            }
            return response.sendBadRequestResponse("Error while updating grn", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while updating grn", null, err, res);
    }
}
async function deleteGrn(req, res) {
    try {
        const result = await GrnService.deleteGrn(req);
        if (result.status === 200) {
            return response.sendSuccessResponse("Grn deleted successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while deleting grn", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while deleting grn", null, err, res);
    }
}

module.exports = {
    createGrn,
    getAllGrn,
    updateGrn,
    deleteGrn
}
