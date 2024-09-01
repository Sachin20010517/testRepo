const reportService = require('../services/report-service');
var response = require("../utils/response-utils");

async function getInvoiceByCuzAndDate(req, res) {
    try {
        const result = await reportService.getInvoiceByCuzAndDate(req.body);
        if (result.status === 200) {
            return response.sendSuccessResponse("Invoice fetched successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while fetching invjjkjoice", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while fetching invoice", null, err, res);
    }
}

module.exports = {
    getInvoiceByCuzAndDate,
}
