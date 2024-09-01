"use strict";
const ReceiptService = require('../services/receipt-service');
var response = require("../utils/response-utils");

async function createReceipt(req, res) {
    try {
        
        const result = await ReceiptService.createReceipt(req.body);
        if (result.status === 200) {
            return response.sendSuccessResponse("Receipt created successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while creating receipt", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while creating receipt", null, err, res);
    }
}

async function getReceipts(req, res) {
    try {
        const result = await ReceiptService.getReceipts();
        if (result.status === 200) {
            return response.sendSuccessResponse("Receipts fetched successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while fetching receipts", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while fetching receipts", null, err, res);
    }
}


module.exports = {
    createReceipt,
    getReceipts,
}