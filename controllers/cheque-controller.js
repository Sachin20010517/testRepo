"use strict";

const ChequeService = require("../services/cheque-service");
var response = require("../utils/response-utils");

async function getAllCheques(req, res) {
    try {
        const result = await ChequeService.getAllCheques();
        if (result.status === 200) {
            return response.sendSuccessResponse("Cheques fetched successfully", result, res);
        }
        else {
            return response.sendBadRequestResponse("Error while fetching cheque", null, result.error, res);
        }
    }
    catch (err) {
        return response.sendServerErrorResponse("Error while fetching cheque", null, err, res);
    }
}

async function updateCheque(req,res){
    
    try{
        const result = await ChequeService.chequeBanked(req);
        if(result.status === 200){
            return response.sendSuccessResponse("cheque Updated Successfully",result,res);
        }
        else{
            return response.sendBadRequestResponse("Error while updating cheque",null,result.error,res);
        }
    }catch(err){
        console.log(err);
        
    }
}


module.exports = {
    getAllCheques,
    updateCheque
}   